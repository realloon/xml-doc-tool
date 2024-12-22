# xml-doc-tool

这是为 Rimworld 创建的工具，`xml-doc-tool` 从 `.xml` 文件中提取节点的关系信息，输出 `.josn` 文件。

## 示例

```xml
<?xml version="1.0" encoding="utf-8"?>
<Defs>
  <ThingDef Abstract="True" Name="Weapon">
    <category>Item</category>
    <statBases>
      <MaxHitPoints>100</MaxHitPoints>
    </statBases>
  </ThingDef>
</Defs>
```

对于这样的 xml，将会输出：

```json
{
  "Defs": {
    "parents": ["_root"],
    "children": ["ThingDef"],
    "values": [],
    "attributes": {}
  },
  "ThingDef": {
    "parents": ["Defs"],
    "children": ["category", "statBases"],
    "values": [],
    "attributes": { "Abstract": ["True"]， "Name": ["Weapon"] }
  },
  "category": {
    "parents": ["ThingDef"],
    "children": [],
    "values": ["Item"],
    "attributes": {}
  },
  "statBases": {
    "parents": ["ThingDef"],
    "children": ["MaxHitPoints"],
    "values": [],
    "attributes": {}
  },
  "MaxHitPoints": {
    "parents": ["statBases"],
    "children": [],
    "values": [100],
    "attributes": {}
  }
}
```

## 如何使用？

### 直接使用结果

项目的 `dist/assets/db.json` 是基于 1.5 版本 RimWorld 的 `Core` 生成的结果，可以直接使用它。

### 运行本程序

如果 RimWorld 版本有更新，或者你想从任何来源（DLC、Mods）提取，请看下面的流程。

首先，你需要安装本项目的依赖：


```sh
bun install
```

然后，将所需提取的文件夹放入本项目 `input/` 路径下。

最后，启动本程序：

```sh
bun run start
```

现在，你应该能在 `dist/assets/db.json` 看到结果。

> This project was created using `bun init` in bun v1.1.40. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.