<?php
// Получение данных с формы:
$name = htmlspecialchars($_POST['firstName']);
$email = htmlspecialchars($_POST['Email']);
$tel = htmlspecialchars($_POST['phNumber']);

// Инициализация переменных:
$source = getenv('HTTP_REFERER');
$subject = "Тема письма клиенту";
$message = "Текст письма:
    <br><br>
    Имя: $name<br>
    E-mail: $email<br>
    Телефон: $tel<br>";

$headers = "From: $email\r\nReply-To: $email\r\nContent-type: text/html; charset=utf-8\r\n";

// Отправка данных на почту:
$success = mail("admin@yoursite.com", $subject, $message, $headers);

// Сохранение информации о лидах в файл leads.csv:
$date = date("d.m.y"); // число.месяц.год
$time = date("H:i"); // часы:минуты:секунды

$f = fopen("leads.xls", "a+");
fwrite($f, "$name, $email, $tel, $date $time\n");
fclose($f);
?>