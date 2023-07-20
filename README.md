# AstakhavaDasha_ReactCourse_2023

RF485. Домашнее задание — проект RainbowFrame ([Решение](https://github.com/j1mb1m/AstakhavaDasha_ReactCourse_2023/tree/main/rainbow-frame/index.html))
Разработать новый проект RainbowFrame в папке RainbowFrame.
Компонент RainbowFrame должен получать в props массив цветов и строить несколько вложенных рамочек, по одной на каждый цвет (в любом порядке). Внутри рамочек должно быть то содержание, которое вложено в тег RainbowFrame.

Пример выполнения:

render() {
  let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
  return (
    <RainbowFrame colors={colors}>
      Hello!
    </RainbowFrame>
  );
}
