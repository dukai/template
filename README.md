# template

A simple javascript template engine that support native JavaScript grammar.

简单的JavaScript模板工具，支持JavaScript原生语法。

模板文件内容演示：

```` html
<?if(this.list && this.list.length > 0){?>
<ul>
  <?for(var i = 0, len = this.list.length; i < len; i++){?>
    <li><strong><?=this.list[i].name?></strong><span><?=this.list[i].age?></span></li>
  <?}?>
</ul>
<?}?>
````
基本用法

```` javascript
var Tmpl = require('path/tmplate');

var customTmpl = new Tmpl(templateContent);
var html = customTmpl.render({
  list: [
    {name: 'xiaoming', age: 12}, {name: 'xiaohong', age: 12}
  ]
};
````
