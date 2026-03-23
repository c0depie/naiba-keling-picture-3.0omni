#!/usr/bin/env bun
/**
 * 可灵图片 3.0 Omni 提示词生成器
 * Keling Image 3.0 Omni Prompt Generator
 *
 * Usage:
 *   bun main.ts --interactive
 *   bun main.ts --topic "一个女人在森林里采花" --style cinematic
 *   bun main.ts --template portrait --subject "年轻女性"
 */

import { parseArgs } from "node:util";

// ==================== 类型定义 ====================

interface PromptOptions {
  interactive?: boolean;
  topic?: string;
  subject?: string;
  scene?: string;
  action?: string;
  style?: StyleType;
  shot?: ShotSize;
  angle?: CameraAngle;
  mood?: string;
  film?: FilmType;
  series?: boolean;
  count?: number;
  output?: string;
  template?: TemplateType;
}

type StyleType =
  | "cinematic"
  | "portrait"
  | "fantasy"
  | "scifi"
  | "anime"
  | "film-noir"
  | "commercial"
  | "watercolor"
  | "oil-painting";

type ShotSize =
  | "远景"
  | "全景"
  | "中景"
  | "近景"
  | "特写"
  | "大特写";

type CameraAngle =
  | "平视"
  | "俯视"
  | "仰视"
  | "鸟瞰"
  | "荷兰角";

type FilmType = "kodak" | "fuji" | "polaroid" | "none";

type TemplateType =
  | "portrait"
  | "cinematic"
  | "film-noir"
  | "fantasy"
  | "scifi"
  | "anime"
  | "commercial"
  | "series-story";

// ==================== 提示词构建器 ====================

class KelingPromptBuilder {
  private layers: string[] = [];

  // 第1层：基础信息
  addBasicInfo(subject: string, action?: string, scene?: string): this {
    let layer = subject;
    if (action) layer += `，${action}`;
    if (scene) layer += `。${scene}`;
    this.layers[0] = layer;
    return this;
  }

  // 第2层：摄影专业
  addCinematic(shot?: ShotSize, angle?: CameraAngle, depth = "浅景深"): this {
    const parts: string[] = [];
    if (shot) parts.push(`${shot}景别`);
    if (angle) parts.push(`${angle}拍摄`);
    if (depth) parts.push(`${depth}虚化背景`);
    if (parts.length > 0) {
      this.layers[1] = parts.join("，");
    }
    return this;
  }

  // 第3层：构图与光影
  addComposition(composition?: string, lighting?: string): this {
    const parts: string[] = [];
    if (composition) parts.push(composition);
    if (lighting) parts.push(lighting);
    if (parts.length > 0) {
      this.layers[2] = parts.join("。");
    }
    return this;
  }

  // 第4层：风格与质感
  addStyle(
    texture = "真实电影质感",
    film?: FilmType,
    tone?: string
  ): this {
    const parts: string[] = [];
    parts.push(`画面带有${texture}`);

    if (film === "kodak") {
      parts.push("柯达Vision系列胶片拍摄");
    } else if (film === "fuji") {
      parts.push("富士胶片拍摄");
    } else if (film === "polaroid") {
      parts.push("宝丽来风格");
    }

    if (tone) parts.push(`${tone}色调基底`);

    this.layers[3] = parts.join("，");
    return this;
  }

  // 第5层：氛围与情绪
  addAtmosphere(mood?: string, expression?: string): this {
    const parts: string[] = [];
    if (mood) parts.push(`${mood}氛围`);
    if (expression) parts.push(`神情${expression}`);
    if (parts.length > 0) {
      this.layers[4] = parts.join("，");
    }
    return this;
  }

  // 构建完整提示词
  build(): string {
    // 过滤空层并组合
    const validLayers = this.layers.filter(Boolean);
    return validLayers.join("。") + "。";
  }

  // 获取分层结果（用于调试）
  getLayers(): string[] {
    return this.layers;
  }
}

// ==================== 预设模板 ====================

const templates: Record<TemplateType, (subject: string) => string> = {
  portrait: (subject: string) =>
    `${subject}，面带微笑。近景景别，平视拍摄。柔和的室内光线，背景简洁。人像摄影风格，肤色自然，色调清新明亮。真实电影质感。`,

  cinematic: (subject: string) =>
    `${subject}，神情专注。中景景别，平视拍摄。浅景深虚化背景。光线是柔和的散射自然光。画面带有真实电影颗粒感，真实电影质感。`,

  "film-noir": (subject: string) =>
    `${subject}，在昏暗的街道上。平视拍摄，中景景别。高对比度的光影，明暗分明。孤独、神秘的氛围。低饱和的青灰色调，黑色电影风格。`,

  fantasy: (subject: string) =>
    `奇幻森林里，${subject}，神情好奇。俯视拍摄，近景景别。利用枝叶形成框式构图，焦点锁定在主体。光线是柔和的散射自然光，形成斑驳光影。画面带有真实电影颗粒感，奇幻氛围。`,

  scifi: (subject: string) =>
    `未来城市内，${subject}。广角镜头，全景景别。霓虹灯光照亮场景，蓝色和粉红色的灯光交织。电子设备发出的光在人物面部形成高光。科技感与反乌托邦感并存的氛围。真实电影质感。`,

  anime: (subject: string) =>
    `${subject}，表情生动。近景景别，平视拍摄。明亮的光线，色彩鲜艳。日系动漫风格，线条清晰，色调明亮柔和。`,

  commercial: (subject: string) =>
    `${subject}，摆放在简洁的台面上。平视拍摄，特写景别。专业的商业摄影布光，突出产品质感。背景简洁，白色或浅灰色调。专业商业摄影风格。`,

  "series-story": (subject: string) =>
    `【系列组图】以${subject}为主题的故事板序列。\n\n第1张（远景开场）：展示环境和氛围\n第2张（中景人物）：${subject}出场\n第3张（近景动作）：详细动作或表情\n第4张（全景结尾）：场景收尾\n\n每张图保持一致的色调和风格。`,
};

// ==================== 风格预设 ====================

const stylePresets: Record<StyleType, Partial<PromptOptions>> = {
  cinematic: {
    shot: "中景",
    angle: "平视",
    mood: "电影感",
    film: "kodak",
  },
  portrait: {
    shot: "近景",
    angle: "平视",
    mood: "自然",
    film: "kodak",
  },
  fantasy: {
    shot: "近景",
    angle: "俯视",
    mood: "奇幻",
    film: "kodak",
  },
  scifi: {
    shot: "全景",
    angle: "平视",
    mood: "科技感",
    film: "none",
  },
  anime: {
    shot: "中景",
    angle: "平视",
    mood: "明亮",
    film: "none",
  },
  "film-noir": {
    shot: "中景",
    angle: "平视",
    mood: "神秘",
    film: "kodak",
  },
  commercial: {
    shot: "特写",
    angle: "平视",
    mood: "专业",
    film: "none",
  },
  "watercolor": {
    shot: "中景",
    angle: "平视",
    mood: "柔和",
    film: "none",
  },
  "oil-painting": {
    shot: "中景",
    angle: "平视",
    mood: "艺术",
    film: "none",
  },
};

// ==================== 交互式输入 ====================

async function promptInput(question: string): Promise<string> {
  console.log(`\n📝 ${question}`);
  // 简化版：使用命令行参数，实际可使用 readline
  return "";
}

// ==================== 主函数 ====================

async function main() {
  const {
    values: {
      interactive,
      topic,
      subject,
      scene,
      action,
      style,
      shot,
      angle,
      mood,
      film,
      series,
      count,
      output,
      template,
    },
  } = parseArgs({
    options: {
      interactive: { type: "boolean", short: "i" },
      topic: { type: "string" },
      subject: { type: "string" },
      scene: { type: "string" },
      action: { type: "string" },
      style: { type: "string" },
      shot: { type: "string" },
      angle: { type: "string" },
      mood: { type: "string" },
      film: { type: "string" },
      series: { type: "boolean" },
      count: { type: "string" },
      output: { type: "string", short: "o" },
      template: { type: "string" },
    },
  });

  let result: string;

  // 模板模式
  if (template) {
    const templateKey = template as TemplateType;
    if (templates[templateKey]) {
      const subjectInput = subject || topic || "主体";
      result = templates[templateKey](subjectInput);
    } else {
      console.error(`❌ 未知模板: ${template}`);
      console.error(`可用模板: ${Object.keys(templates).join(", ")}`);
      process.exit(1);
    }
  }
  // 系列组图模式
  else if (series) {
    const subjectInput = subject || topic || "主体";
    const countNum = count ? parseInt(count) : 4;
    result = templates["series-story"](subjectInput);
    console.log("\n🎬 系列组图模式");
    console.log(`张数: ${countNum}\n`);
  }
  // 普通构建模式
  else {
    const builder = new KelingPromptBuilder();

    // 应用风格预设
    const stylePreset = style ? stylePresets[style as StyleType] : undefined;

    // 第1层：基础信息
    const subjectInput = subject || topic || "一个主体";
    const actionInput = action || (stylePreset?.mood === "神秘" ? "独自站立" : undefined);
    const sceneInput = scene;
    builder.addBasicInfo(subjectInput, actionInput, sceneInput);

    // 第2层：摄影专业
    const shotInput = (shot as ShotSize) || stylePreset?.shot;
    const angleInput = (angle as CameraAngle) || stylePreset?.angle;
    builder.addCinematic(shotInput, angleInput);

    // 第3层：构图与光影
    const composition = shotInput === "特写" ? "焦点精确锁定在主体" : undefined;
    const lighting = "光线是柔和的散射自然光";
    builder.addComposition(composition, lighting);

    // 第4层：风格与质感
    const filmInput = (film as FilmType) || stylePreset?.film;
    const tone = mood ? mood + (stylePreset?.mood ? "" : "色调") : undefined;
    builder.addStyle("真实电影质感", filmInput, tone);

    // 第5层：氛围与情绪
    const moodInput = mood || stylePreset?.mood;
    const expression = actionInput ? undefined : "专注又带着期待";
    builder.addAtmosphere(moodInput, expression);

    result = builder.build();
  }

  // 输出结果
  console.log("\n" + "═".repeat(50));
  console.log("🎨 可灵图片 3.0 Omni 提示词");
  console.log("═".repeat(50) + "\n");
  console.log(result);
  console.log("\n" + "═".repeat(50));

  // 保存到文件
  if (output) {
    await Bun.write(output, result);
    console.log(`\n✅ 已保存到: ${output}`);
  }
}

// ==================== 运行 ====================

main().catch(console.error);
