# one-punch-man-rpg

## User Journey Draft

### Player Part:
1. Player needs to login in order to play the game
2. Player can have unlimited number of distinct characters
3. Player can have only one team layout, which consists of 6 characters
4. Player can fight against PC
5. Player can fight against other players (optional)

### Character Part:
1. Character has a name
2. Character has a level
3. Character has a type (Hero, Monster)
4. Character has a class (UR, SSR+, SSR, SR, R, N)
5. Character has HP state
6. Character has ATK state
7. Character has DEF state
8. Character has SPD state
9. Character has total of 3 skills
10. Character has total of 4 empty slots for equipment

### Battle Part:
1. Battle is turn-based
2. Battle is 6 vs 6
3. Battle has immediate result, each action is calculated by the following possible formula:
    - `damage = (ATK of attacker - DEF of defender) * (1 + (SPD of attacker - SPD of defender) / 100)`
    - `HP of defender = HP of defender - damage`

### UI Part:
1. Login page
2. Character list page
3. Character detail page
4. Team layout page
5. inventory page
6. Battle page, which is just console screen



