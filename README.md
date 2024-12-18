
# 🎮 **Quiz Host App** 🎮

Welcome to our **Trivia App**! Below you'll find the different components of our system and how to run them effortlessly.

---

## 🧩 **Project Components**

### 1. **`quiz-host-app`**: The main host application
   - **Description**: This is where the host manages the game.

### 2. **`questions-app`**: Remote questions application
   - **Description**: Manages the questions that will be shown during the game.

### 3. **`ranking-app`**: Remote ranking application
   - **Description**: Displays the real-time ranking of players.

### 4. **`stats-app`**: Remote stats application
   - **Description**: Displays game statistics, such as scores and progress.

### 5. **`quiz-backend`**: The server that makes everything work
   - **Description**: Our backend handles the game logic.

---

## 🚀 **How to Run the Project**

Follow these steps to get everything up and running:

### 1️⃣ **Run the backend**
```bash
npm run start
```

### 2️⃣ **Run all remote applications**
```bash
npm run serve
```

### 3️⃣ **Run the main host application**
```bash
npm run dev
```

---

## 🎮 **Start the Game!**

To start the game, make a **POST** request to the following URL:

```bash
http://localhost:3000/api/start-game
```

And that's it! The game will start, and you can enjoy the full experience.

---

Have fun playing, and may the best player win! 🏆
