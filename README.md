# venture-dating-sim
 ## <벤창웹 연애 시뮬레이션>
👤 그녀(그)의 사랑을 쟁취하라.

나에 대한 그녀(그)의 호감도를 높여서 사랑을 쟁취하자!

<br>

# 🧰 Model explanation 
## User
* username(String)
* password(alphanumeric)
* name(String)
* key(string)
* level(Number)
* item(array)
* hp(Number)
* exp(Number)
* str(Number)
* map(db saving, objectId) 

## Item
* user(multi vs multi)
* hp(Number)
* exp(Number)
* str(Number) 

## Monster
* name(String)
* hp(Number)
* exp(Number)
* str(Number) 

## map
* coordinate(objectId)
* event(String) 

## coordinate 
* x(Number)
* y(Number)

<br>

# 📲 REQUEST
## 기본 스펙
* /signup 
* /login 
* /move/:rowIndex/:columnIndex 
* /battle/:turn
* /item/:itemId ➡️ (/move로 오면 back에서 item을 front로 주고 front에서 다시 /item/:itemId) 
* /rest

## 추가 스펙 
* /escape
* /retry/:turn 

<br>

# 💡 기타
## Check
* isGameOver : true / false 
* isEnded : true/false
* when battle is over, send user as a response

## About Commits
* `[feature]` : 기능추가 
* `[fix]` : 고치기 
* `[refactor]` : 리팩토링 
* `[chore]` : 기타