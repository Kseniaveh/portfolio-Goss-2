Список заданий:
          
          -13.03.2018  (Простой веб-сервер в Node)
          
          -20.03.2018 (Express)
          
          -17.04.2018 (сессии в Express)
          
          -08.05.2018 (клиентский роутер + Material design)

          -Борд проекта https://kodaktor.ru/bind02032018
          
Указания авторства во всех выполненных заданиях с выполнением требования z7a (kodaktor.ru/z7a)

Проекты:

   1. Приложение на фреймворке Silex, размещённое на Heroku. Должно выполнять все действия из соответствующего раздела курса в Moodle.
   
      См. шаблонизатор Twig 
      
      См. репозиторий с кодом простого приложения в качестве примера

   2. Приложение ToDoList с клиентской частью на React и серверной частью 
   
      При первом обращении таски должны считываться из https://kodaktor.ru/j/db.json — это начальное состояние!
      
      После этого все действия с тасками должны логироваться в файл db.json, либо в БД по вашему усмотрению (например mongolab)
         т.е. серверную часть вы можете реализовать как микросервис, за который отвечает json-server
         
      В приложении должен быть маршрут /reset который приводит приложение в начальное состояние 
         в случае использования json-server /reset означает фактически curl -SLO 'https://kodaktor.ru/j/db.json'
         
      Вывод списка задач и ввод новой задачи должны быть в двух разных компонентах
  
