# єДопомога

(Це клієнтська сторона застосунку. Хостити її потрібно локально)

єПотреба – це платформа для розміщення запитів про  допомогу, тим, хто ЇЇ терміново потребує. Для розміщення запитів Вам необхідно зареєструватися як стороні, що просить про допомогу – натиснути “Шукаю допомогу” на головній сторінці. 
При створенні нового запита, необхідно вибрати одну чи більше категорій (для кого ця допомога), а також скільки завгодно багато тегів для пошуку Вашого запита. Також вкажіть крайній термін актуальності запиту і Ваші контактні дані.

Якщо Ви бажаєте переглянути опубліковані на платформі запити, Вам потрібно зареєструватися як стороні, що надає допомогу – натиснути “Хочу допомогти” на головній сторінці. 

Зверніть увагу! Наразі не є активною аутентифікація користувачів для запобігання шахрайства. Ця функція може бути реалізована через авторизацію в додатку “Дія”.

This project implements React, React Router, React Form Hooks & Chakra UI to build frontend for SPA project

Here are some of the main features of the app:
* Registration of 2 types of users: the one who need help and the one who can help (using JWT from abckend)
* User which want to help have access to list of requests from users that need help
* User which need help ahve access to page to create help request

## Installation

To run the project locally, follow these steps:

1. Clone the repository and jump into a front foulder:

   ```
   git clone https://github.com/cyclozvir/hackathon-8-test-client.git
   cd front
   ```

2. Run local env 
    ```
    npm run dev
    ```

The application should now be running on [http://localhost:5173/](http://localhost:5173/).
