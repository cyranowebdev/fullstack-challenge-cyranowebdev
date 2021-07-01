# README BACKEND
## Requests Cheatsheet :)

### Session (cadastro de usuário, consultas, login)
##### POST user
```curl --request POST \
  --url http://localhost:3001/user/register \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "Professor Imaginario",
	"email": "teacher@school1.com",
	"password": "123123",
	"profile": "teacher"
}'```

- cadastro de usuário (perfis aceitos pelo sistema: 'admin', 'director', 'teacher'; nome deve ter 12 ou mais caracteres; senha deve ter 6 ou mais caracteres)

##### POST (buscar usuário por Id)
```curl --request POST \
  --url http://localhost:3001/user/ \
  --header 'Content-Type: application/json' \
  --header 'authorization: (token JWT)' \
  --data '{
	"userId": "60ce5df11d4f387b8b31928d"
}'```

- retorna nome e email do usuário, se encontrado

##### Login
```curl --request POST \
  --url http://localhost:3001/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "admin@test.com",
	"password": "123123"
}'```

- retorna nome, email, profile e token do usuário

### ADMIN
##### GET usuários
```curl --request GET \
  --url http://localhost:3001/admin/users/ \
  --header 'authorization: (token JWT)'

- retorna todos os usuários do DB

##### GET usuários por profile
```curl --request GET \
  --url http://localhost:3001/admin/users/director \
  --header 'authorization: (token JWT)```

- retorna todos os usuários do DB com aquele perfil (usando query params, no exemplo acima, 'director')

##### DELETE usuário
```curl --request DELETE \
  --url http://localhost:3001/admin/user/ \
  --header 'Content-Type: application/json' \
  --header 'authorization: (token JWT)' \
  --data '{
	"userId": "60ce385f7a7a1d5142292f1a"
}'```

- remove usuário do DB por Id

##### GET escolas
```curl --request GET \
  --url http://localhost:3001/admin/schools \
  --header 'authorization: (token JWT)'```

- retorna todas as escolas cadastradas no DB

##### POST escola
```curl --request POST \
  --url http://localhost:3001/admin/schools/create \
  --header 'Content-Type: application/json' \
  --header 'authorization: (token JWT)' \
  --data '{
	"name": "escola Estadual director school2",
	"address": "Outro endereco",
	"type": "1",
	"director": "director@school1.com"
}'```

- cria nova escola (o campo director é o único NÃO obrigatório, nesse caso a escola é criada com uma chave status : 'False')

##### UPDATE escola
```curl --request PUT \
  --url http://localhost:3001/admin/schools/edit \
  --header 'Content-Type: application/json' \
  --header 'authorization: (token JWT)' \
  --data '{
	"payload": {
		"name": "escola federal imaginaria",
		"address": "UMA RUA DE VERDADE",
		"type": "1",
		"director": "director@school2.com"
	},
	"schoolId": "60ce62d064bab502f31d462e"
}'```

- UPDATE dados da escola (chave 'director' é a única não obrigatória)

##### DELETE escola
```curl --request DELETE \
  --url http://localhost:3001/admin/school/ \
  --header 'Content-Type: application/json' \
  --header 'authorization: (token JWT)' \
  --data '{
	"schoolId": "60d39d4fdc56df40bea3fd2d"
}'```

- remove escola do DB, por Id

### DIRETOR
##### POST buscar docentes
```curl --request GET \
  --url 'http://localhost:3001/school/teacher?email=meu' \
  --header 'authorization: (token JWT)'```

- busca por usuários cadastrados como professores no sistema usando query params (os campos aceitos são 'email' ou 'name')

##### GET escola
```curl --request GET \
  --url http://localhost:3001/school \
  --header 'authorization: (token JWT)'```

- retorna a escola à qual o usuário está vinculado como diretor, se houver

##### GET turmas
```curl --request POST \
  --url http://localhost:3001/school/classes \
  --header 'Content-Type: application/json' \
  --header 'authorization: (token JWT)' \
  --data '{
	"schoolId": "60d0b70113744674d9d30a86"
}'```

- retorna as turmas vinculadas à escola, por Id da escola (valida se o usuário é diretor da escola)

##### GET turma por Id
```curl --request POST \
  --url http://localhost:3001/school/class/get \
  --header 'Content-Type: application/json' \
  --header 'authorization: (token Id)' \
  --data '{
	"classId": "60d3ab24da3f23560469b014"
}'```

- retorna turma cadastrada no DB, por Id da turma

##### CREATE turma
```curl --request POST \
  --url http://localhost:3001/school/class \
  --header 'Content-Type: application/json' \
  --header 'authorization: (token JWT)' \
  --data '{
	"payload": {
		"schoolId": "60d0b70113744674d9d30a86",
		"class": "A",
		"year": "2020",
		"teachers": ["60cf9d51a28d2d1fd15c7dda"],
		"grade": "1"
	}
}'```

- cria nova turma, vinculada a uma escola cadastrada no DB (retorna erro caso Id da escola seja inválido ou não exista no DB)

##### UPDATE turma
```curl --request PUT \
  --url http://localhost:3001/school/class \
  --header 'Content-Type: application/json' \
  --header 'authorization: (token JWT)' \
  --data '{
	"payload": {
		"classId": "60cf43e4f6c72325b76d58c4",
		"teachers": ["60cf9d51a28d2d1fd15c7dda", "60cf9d5aa28d2d1fd15c7ddb"]
	}
}'```

- atualiza dados da turma, por Id (único campo autorizado é o 'teachers')

##### DELETE turma
```curl --request DELETE \
  --url http://localhost:3001/school/class \
  --header 'Content-Type: application/json' \
  --header 'authorization: (token JWT)' \
  --data '{
	"classId": "60d3ad3e6630e85967d8cc4c"
}'```

- remove turma do DB, por Id

### DOCENTE
##### GET turmas
```curl --request GET \
  --url http://localhost:3001/teacher \
  --header 'authorization: (token JWT)'```

- retorna as turmas às quais o usuário está vinculado como professor, se houverem, incluindo dados da escola)

##### GET comentários sobre estudante
```curl --request GET \
  --url http://localhost:3001/teacher/students \
  --header 'Content-Type: application/json' \
  --header 'authorization: (token JWT)' \
  --data '{
	"name": "estudante II",
	"classId": "60d48f2dde863b47bf761809"
}'```

- retorna os comentários relativos a um estudante de uma turma (valida se usuário é professor daquela turma)

##### CREATE comentário da turma
```curl --request POST \
  --url http://localhost:3001/teacher/class \
  --header 'Content-Type: application/json' \
  --header 'authorization: (token JWT)' \
  --data '{
	"classId": "60d48f2dde863b47bf761809",
	"msg": "Novo comentário sobre a turma"
}'```

- adiciona novo comentário do usuário sobre uma turma (valida se está vinculado a ela como professor)

##### UPDATE turma (adicionar estudante)
```curl --request POST \
  --url http://localhost:3001/teacher/student \
  --header 'Content-Type: application/json' \
  --header 'authorization: (token JWT)' \
  --data '{
	"name": "estudante II",
	"classId": "60d48f2dde863b47bf761809"
}'```

- adiciona estudante a uma turma

##### UPDATE turma (adiciona comentário sobre estudante)
```curl --request PUT \
  --url http://localhost:3001/teacher/students \
  --header 'Content-Type: application/json' \
  --header 'authorization: (token JWT)' \
  --data '{
	"name": "estudante II",
	"classId": "60d48f2dde863b47bf761809",
	"msg": "Esse estudante está com dificuldades no conteúdo X"
}'```

- adiciona comentário a um estudante de uma turma

##### DELETE estudante
```curl --request DELETE \
  --url http://localhost:3001/teacher/student \
  --header 'Content-Type: application/json' \
  --header 'authorization: (token JWT)' \
  --data '{
	"name": "mais outro estudante",
	"classId": "60cf43b7f6c72325b76d58c2"
}'```

- remove um estudante de uma turma
