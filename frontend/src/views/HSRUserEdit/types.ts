import type {
  HSRUserConfig_Abyss,
  HSRUserConfig_Data,
  HSRUserConfig_Info,
  HSRUserConfig_Stage,
  HSRUserConfig_TaskOpt,
  HSRUserConfig_TaskSwitch,
} from '@/api'

export type HSRStageEngine = 'M7A' | 'SRA'

export type HSRDynamicStageOption = {
  label: string
  detail?: string | null
  value: string
  categoryKey: string
  categoryLabel: string
  cost?: number | null
  maxCount?: number | null
  m7a?: {
    instanceType?: string
    instanceName?: string
  }
  sra?: {
    id?: string
    level?: number
  }
}

export type HSRDynamicStageCategory = {
  categoryKey: string
  categoryLabel: string
  cost?: number | null
  maxCount?: number | null
  options: HSRDynamicStageOption[]
}

export type HSRDynamicStageOptionsData = {
  engine: HSRStageEngine
  source?: string
  categories: HSRDynamicStageCategory[]
}

export type HSRScriptStagePayload = {
  engine?: HSRStageEngine | ''
  category?: string
  categoryLabel?: string
  label?: string
  detail?: string
  value?: string
  sra?: {
    id?: string
    level?: number | null
  }
  m7a?: {
    instanceType?: string
    instanceName?: string
  }
}

export type HSRScriptStageContainer = {
  engine?: HSRStageEngine | ''
  stages?: Partial<Record<string, HSRScriptStagePayload>>
}

export type HSRUserConfigAbyss = HSRUserConfig_Abyss & {
  Snapshots?: string | null
}

// HSR 内部非空 reactive 形态（OpenAPI 生成的类型全部字段为 optional | null，
// 但前端用 reactive 实际为非空值；模板 / 计算属性通过该形态消除 strict null 警告）。
export type HSRUserConfigData = {
  Info: HSRUserConfig_Info
  Stage: HSRUserConfig_Stage
  TaskSwitch: HSRUserConfig_TaskSwitch
  TaskOpt: HSRUserConfig_TaskOpt
  Data: HSRUserConfig_Data
  Abyss: HSRUserConfigAbyss
}
