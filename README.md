# venture-dating-sim

model explanation user - username(String), password(alphanumeric), name(String), key(string), level(Number), item(array), hp(Number), exp(Number), str(Number), map(db saving, objectId) item - user(multi vs multi), hp(Number), exp(Number), str(Number) monster - name(String), hp(Number), exp(Number), str(Number) map - coordinate(objectId), event(String) coordinate - x(Number), y(Number)

Endpoint /signup /login move auth : /move/:rowIndex/:columnIndex /battle/:turn, /item/:itemId, (/move로 오면 back에서 item을 front로 주고 front에서 다시 /item/:itemId) /rest

추가스펙 /retry/:turn /escape

isGameOver : true/false isEnded : true/false

when battle is over, send user as a response

feature 기능추가 fix 고치기 refactor 리팩토링 chore 기타