const player1 = {
    name: "Mario",
    speed: 4,
    flexibility: 3,
    strength: 3,
    points: 0,
};

const player2 = {
    name: "Luigi",
    speed: 3,
    flexibility: 4,
    strength: 4,
    points: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO";
            break;
    }
    return result;
}

async function logRollResult(name, block, dice, attribute) {
    console.log(`${name} 🎲 rolou um dado de ${block} ${dice} + ${attribute} = ${dice + attribute}`);
}

async function playRaceEngine(char1, char2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`\n🏁 === Rodada ${round} ===`);

        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);


        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + char1.speed;
            totalTestSkill2 = diceResult2 + char2.speed;

            await logRollResult(char1.name, 'Velocidade', diceResult1, char1.speed);
            await logRollResult(char2.name, 'Velocidade', diceResult2, char2.speed);
        }

        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + char1.flexibility;
            totalTestSkill2 = diceResult2 + char2.flexibility;

            await logRollResult(char1.name, 'Flexibilidade', diceResult1, char1.flexibility);
            await logRollResult(char2.name, 'Flexibilidade', diceResult2, char2.flexibility);
        }

        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + char1.strength;
            let powerResult2 = diceResult2 + char2.strength;

            console.log(`${char1.name} confrontou com ${char2.name}! 🤜💥🤛`);
            await logRollResult(char1.name, 'Poder', diceResult1, char1.strength);
            await logRollResult(char2.name, 'Poder', diceResult2, char2.strength);

            if (powerResult1 > powerResult2) {
                console.log(`${char1.name} venceu o confronto! ${char2.name} ${char2.points > 0 ? 'perdeu 1 ponto 🐢' : 'com 0 pontos'}`)
                char2.points--;
            }
            if (powerResult2 > powerResult1 && char1.points > 0) {
                console.log(`${char2.name} venceu o confronto! ${char1.name} ${char1.points > 0 ? 'perdeu 1 ponto 🐢' : 'com 0 pontos'}`)
                char1.points--;
            }

            console.log(powerResult1 == powerResult2 ? "Confronto Empatado! Nenhum ponto foi perdido" : '');

        }

        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${char1.name} marcou um ponto!`);
            char1.points++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${char2.name} marcou um ponto!`);
            char2.points++;
        }
    }
}

async function declareWinner(char1, char2) {
    console.log("\n==================\nResultado Final:");
    console.log(`${char1.name}: ${char1.points} ponto(s)`);
    console.log(`${char2.name}: ${char2.points} ponto(s)`);

    if (char1.points > char2.points) {
        console.log(`\n${char1.name} venceu a corrida! Parabéns! 🏆`);
    } else if (char2.points > char1.points) {
        console.log(`\n${char2.name} venceu a corrida! Parabéns! 🏆`);
    } else {
        console.log("A corrida terminou em empate");
    }
}

(async function main() {
    console.log(`\n🏁 🚨 Corrida entre ${player1.name} e ${player2.name} começando...\n`)

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})()

