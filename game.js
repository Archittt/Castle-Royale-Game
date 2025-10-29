const config = {
  type: Phaser.AUTO,
  width: 720,
  height: 1280,
  backgroundColor: '#004400',
  scene: { preload, create, cardClicked },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }
};

const game = new Phaser.Game(config);

let deck = [];
let pyramidCards = [];
let currentCard = null;
let drawButton = null;
let sounds = {};
let score = 0;
let scoreText;
let ctaButton;
let winText;

function preload() {
  // Background & UI
  this.load.image('bg', 'assets/exports/BG 01.png');
  this.load.image('logo', 'assets/exports/Copy of Solitaire-Castle-Royal_Logo_01.png');
  this.load.image('cta', 'assets/exports/CTA-Download Now.png');
  this.load.image('hud', 'assets/exports/HUD panel.png');
  this.load.image('firework', 'assets/exports/Fireworks.png');
  this.load.image('congrats', 'assets/exports/Text-Congrats.png');

  // Cards
  const suits = ['Clubs', 'Diamonds', 'Heart'];
  const ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  suits.forEach(suit => ranks.forEach(rank => {
    this.load.image(`${suit}-${rank}`, `assets/cards/${suit}-${rank}.png`);
  }));
  this.load.image('back', 'assets/cards/Back Card.png');

  // Sounds
  this.load.audio('click', 'assets/sounds/Button.mp3');
  this.load.audio('win', 'assets/sounds/Game Win.mp3');
  this.load.audio('draw', 'assets/sounds/Draw.mp3');
}

function create() {
  // Background
  this.add.image(360, 640, 'bg').setDisplaySize(720, 1280);
  this.add.image(360, 120, 'logo').setScale(0.6);

  // Sounds
  sounds.click = this.sound.add('click');
  sounds.win = this.sound.add('win');
  sounds.draw = this.sound.add('draw');

  // Build deck
  const suits = ['Clubs', 'Diamonds', 'Heart'];
  const ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  deck = Phaser.Utils.Array.Shuffle(
    suits.flatMap(suit => ranks.map(rank => ({ suit, rank })))
  );

  // Create pyramid (7 cards)
  for (let i = 0; i < 7; i++) {
    const card = deck.pop();
    const sprite = this.add.image(150 + i * 80, 400, `${card.suit}-${card.rank}`).setScale(0.6);
    sprite.setInteractive({ useHandCursor: true });
    sprite.rank = rankToNumber(card.rank);
    sprite.on('pointerdown', () => cardClicked.call(this, sprite));
    pyramidCards.push(sprite);
  }

  // Current card
  const drawCard = deck.pop();
  currentCard = this.add.image(360, 800, `${drawCard.suit}-${drawCard.rank}`).setScale(0.8);
  currentCard.rank = rankToNumber(drawCard.rank);

  // Draw Button instead of deck
  drawButton = this.add.text(360, 1050, '🃏 DRAW DECK', {
    fontFamily: 'Arial',
    fontSize: '42px',
    backgroundColor: '#e3c300',
    color: '#000',
    fontStyle: 'bold',
    padding: { x: 20, y: 10 },
    align: 'center'
  })
  .setOrigin(0.5)
  .setInteractive({ useHandCursor: true });

  drawButton.on('pointerdown', () => {
    drawNextCard.call(this);
    sounds.click.play();
    drawButton.setStyle({ backgroundColor: '#ffeb3b' });
  });

  drawButton.on('pointerup', () => {
    drawButton.setStyle({ backgroundColor: '#e3c300' });
  });

  // Score display
  scoreText = this.add.text(700, 100, 'Score: 0', {
    fontFamily: 'Arial',
    fontSize: '36px',
    color: '#ffffff',
    stroke: '#000000',
    strokeThickness: 4
  }).setOrigin(1, 0);

  // CTA button (hidden until win)
  ctaButton = this.add.image(360, 1150, 'cta').setScale(0.8).setInteractive();
  ctaButton.visible = false;
  ctaButton.on('pointerdown', () => {
    sounds.click.play();
    window.open('https://play.google.com/store', '_blank');
  });

  // Win text
  winText = this.add.image(360, 640, 'congrats').setVisible(false);
}

function cardClicked(card) {
  sounds.click.play();

  if (isMatch(card.rank, currentCard.rank)) {
    score += 100;
    scoreText.setText('Score: ' + score);

    currentCard.setTexture(card.texture.key);
    currentCard.rank = card.rank;
    card.disableInteractive();
    this.tweens.add({
      targets: card,
      y: 800,
      x: 360,
      scale: 0,
      duration: 300,
      onComplete: () => card.destroy()
    });

    pyramidCards = pyramidCards.filter(c => c !== card);
    if (pyramidCards.length === 0) {
      showWin.call(this);
    }
  }
}

function drawNextCard() {
  if (deck.length === 0) {
    drawButton.setText('No Cards Left');
    drawButton.disableInteractive();
    return;
  }

  sounds.draw.play();
  const nextCard = deck.pop();
  currentCard.setTexture(`${nextCard.suit}-${nextCard.rank}`);
  currentCard.rank = rankToNumber(nextCard.rank);

  // Animate small shake
  this.tweens.add({
    targets: currentCard,
    scale: { from: 0.8, to: 0.85 },
    yoyo: true,
    duration: 150
  });
}

function showWin() {
  sounds.win.play();
  winText.setVisible(true);
  ctaButton.visible = true;

  this.tweens.add({
    targets: winText,
    scale: { from: 0.5, to: 1 },
    yoyo: true,
    repeat: 3,
    duration: 400
  });
}

function rankToNumber(rank) {
  if (rank === 'A') return 1;
  if (rank === 'J') return 11;
  if (rank === 'Q') return 12;
  if (rank === 'K') return 13;
  return parseInt(rank);
}

function isMatch(rank1, rank2) {
  return (
    Math.abs(rank1 - rank2) === 1 ||
    (rank1 === 1 && rank2 === 13) ||
    (rank1 === 13 && rank2 === 1)
  );
}