---
name: naiba-keling-picture-3.0omni
description: 可灵图片 3.0 Omni 提示词生成器。5层影视框架构建专业提示词，支持文生图、图生图、系列组图。
---

# 可灵图片 3.0 Omni 提示词生成器

专业影视级图像生成提示词构建工具。基于可灵图片 3.0 Omni 模型的影视镜头语言，支持文生图、图生图、系列组图提示词生成。

## 核心特性

- **5层提示词框架**: 基础信息 → 摄影专业 → 构图光影 → 风格质感 → 氛围情绪
- **影视专业术语**: 景别、机位、焦距、光圈、影调、光影等完整支持
- **双模式**: 单图模式、系列组图模式
- **图生图**: 支持参考图描述、角色替换、风格迁移

## Script Directory

**Agent Execution**:
1. `SKILL_DIR` = this SKILL.md file's directory
2. Script path = `${SKILL_DIR}/scripts/main.ts`

## Usage

### 交互式提示词生成

```bash
# 引导式构建
npx -y bun ${SKILL_DIR}/scripts/main.ts --interactive

# 直接生成
npx -y bun ${SKILL_DIR}/scripts/main.ts --topic "一个女人在森林里采花" --style cinematic
```

### 提示词模板

```bash
# 使用模板快速生成
npx -y bun ${SKILL_DIR}/scripts/main.ts --template portrait --subject "年轻女性"
npx -y bun ${SKILL_DIR}/scripts/main.ts --template film-noir --subject "侦探"
npx -y bun ${SKILL_DIR}/scripts/main.ts --template fantasy --subject "精灵公主"
```

## Options

| Option | Description |
|--------|-------------|
| `--interactive`, `-i` | 交互式模式，逐步引导构建 |
| `--topic <text>` | 主题描述 |
| `--subject <text>` | 主体/角色 |
| `--scene <text>` | 场景 |
| `--action <text>` | 动作 |
| `--style <style>` | 风格: cinematic, portrait, fantasy, scifi, anime |
| `--shot <type>` | 景别: 远景, 全景, 中景, 近景, 特写, 大特写 |
| `--angle <type>` | 角度: 平视, 俯视, 仰视, 鸟瞰 |
| `--mood <text>` | 氛围/情绪 |
| `--film <type>` | 胶片类型: kodak, fuji, polaroid |
| `--series` | 系列组图模式 |
| `--count <n>` | 组图张数 (2-6) |
| `--output <path>` | 输出文件路径 |
| `--template <name>` | 使用预设模板 |

## 5层提示词框架

### 第1层：基础信息 (Basic Info)
- **主体**: 谁/什么 (人物、物体)
- **动作**: 做什么 (具体行为)
- **场景**: 在哪里 (环境描述)

### 第2层：摄影专业 (Cinematic)
- **景别**: 远景、全景、中景、近景、特写、大特写
- **拍摄角度**: 平视、俯视、仰视、鸟瞰、荷兰角
- **镜头类型**: 过肩镜头、主观镜头、跟镜头
- **焦距**: 广角、标准、长焦
- **光圈**: 大光圈虚化、小光圈深景深
- **景深**: 浅景深、深景深

### 第3层：构图与光影 (Composition & Lighting)
- **构图**: 三分法、黄金分割、对称构图、引导线、框架式、对角线
- **光线方向**: 自然光、侧光、逆光、顶光、底光
- **光影效果**: 斑驳光影、轮廓光、伦勃朗光

### 第4层：风格与质感 (Style & Texture)
- **质感**: 真实电影质感、胶片质感、数字质感
- **胶片类型**: 柯达Vision、富士胶片、宝丽来
- **色调**: 青灰、墨黑、暖色、冷色、具体色系
- **颗粒感**: 细腻、粗粝、无颗粒

### 第5层：氛围与情绪 (Atmosphere & Emotion)
- **整体氛围**: 紧张、宁静、戏剧感、梦幻
- **表情细节**: 微表情、情绪状态
- **画面感**: 冲击力、诗意、节奏感

## 图生图提示词结构

```
参考图[N]的[元素]，[动作描述]，[风格要求]。

示例：
"参考图里的神女外形，生成一张奇幻电影截图，复刻图片2的质感和色调。"
"把图2老人替换到图1车里男人的位置，保持原影调氛围一致。"
```

## 系列组图模式

组图模式需要强调：
1. **连贯性**: 风格、色调、角色一致
2. **叙事性**: 每张图承担不同叙事功能
3. **构图变化**: 不同景别、角度组合
4. **智能张数**: 让模型推荐适合数量

示例场景：
- 连续分镜 (2-4张)
- 角色多角度展示 (3-6张)
- 故事板序列 (4-6张)

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

## 参考文档

- `references/prompt-framework.md` - 完整提示词框架
- `references/examples.md` - 示例提示词库
- `references/terminology.md` - 影视术语词典
- `references/templates/` - 各场景模板

## 使用场景触发词

**触发此 skill 的关键词**:
- 可灵、Keling、keling、可灵图片
- 影视级图片、电影感图片、专业图片生成
- 分镜提示词、故事板提示词
- 连环画提示词、组图提示词
- 图生图提示词、风格迁移

## 与其他 skill 配合

- **baoyu-image-gen**: 实际调用图像生成 API
- **seedance2-api**: 生成视频前的分镜图制作
- **baoyu-cover-image**: 封面图专业提示词

## Extension Support

支持通过 EXTEND.md 自定义:
- 默认风格
- 常用场景
- 胶片类型偏好
- 默认色调
