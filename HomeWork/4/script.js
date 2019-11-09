//задание 1
let str = "One: 'Hi Mary.' Two: 'Oh, hi.' One: 'How are you doing?' Two: 'I'm doing alright. How about you?' One: 'Not too bad. The weather is great isn't it?' Two: 'Yes. It's absolutely beautiful today.' One: 'I wish it was like this more frequently.' Two: 'Me too.' One: 'So where are you going now?' Two: 'I'm going to meet a friend of mine at the department store' One: 'Going to do a little shopping?' Two: 'Yeah, I have to buy some presents for my parents.' One: 'What's the occasion?' Two: 'It's their anniversary.' One: 'That's great. Well, you better get going. You don't want to be late.' Two: 'I'll see you next time.' One: 'Sure.' Bye.' "

let kav = str.replace(/'/g, '"');
console.log(kav);

//задание 2
let output = kav.replace(/\b\"/g, '\'' );
console.log(output);

//задание 3*
let form = document.getElementsByTagName('form')[0];
const username = document.getElementById('username');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const text = document.getElementById('text');
const error = document.querySelector('.error');

form.addEventListener("submit", function (event) {
    if (!username.value.match(/[a-zа-я]+/ig)) {
      error.innerHTML = "Имя должно содержать только буквы";
      error.className = "error active";
      event.preventDefault();
    }
    else if (!phone.value.match(/+[7]\(\d\)\d{3}\-\d{4}/g)) {
        error.innerHTML = "Телефон должен быть в формате: +7(000)000-0000";
        error.className = "error active";
        event.preventDefault();
    }
    else if (!email.value.match(/[a-z]+\w+[.-]?[a-z]*\d*@[a-z]+\w+\.[a-z]+/ig)) {
        error.innerHTML = "E-mail должен иметь вид: mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.";
        error.className = "error active";
        event.preventDefault();
    } else {
        alert("OK");
    }
  });


