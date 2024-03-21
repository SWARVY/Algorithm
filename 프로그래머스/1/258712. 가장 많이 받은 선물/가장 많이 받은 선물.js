function solution(friends, gifts) {
    const sendLog = Array.from({ length: friends.length }, () => Array.from({ length: friends.length }, () => 0));
    const receiveLog = Array.from({ length: friends.length }, () => Array.from({ length: friends.length }, () => 0));
    const presentPoint = Array.from({ length: friends.length }, () => 0);
    const answer = Array.from({ length: friends.length }, () => 0);

    // 관계 계산
    for (let i = 0; i < gifts.length; i += 1) {
        const [sender, receiver] = gifts[i].split(' ');
        const senderIdx = friends.indexOf(sender);
        const receiverIdx = friends.indexOf(receiver);
        
        sendLog[senderIdx][receiverIdx] += 1;
        receiveLog[receiverIdx][senderIdx] += 1;
    }
    
    for (let i = 0; i < friends.length; i += 1) {
        const sendSum = sendLog[i].reduce((acc, cur) => acc + cur, 0);
        const receiveSum = receiveLog[i].reduce((acc, cur) => acc + cur, 0);
        
        presentPoint[i] = sendSum - receiveSum;
    }
    

    // 다음달 받을 선물 계산
    for (let i = 0; i < friends.length - 1; i += 1) {
        for (let j = i + 1; j < friends.length; j += 1) {
            if (sendLog[i][j] === sendLog[j][i]) {
                if (presentPoint[i] > presentPoint[j]) {
                    answer[i] += 1;
                } else if (presentPoint[j] > presentPoint[i]) {
                    answer[j] += 1;
                }
            } else {
                sendLog[i][j] > sendLog[j][i] ? answer[i] += 1 : answer[j] += 1;
            }
        }
    }
    
    return Math.max(...answer);
}