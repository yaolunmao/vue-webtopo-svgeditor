<template>
  <div>
    <el-form label-position="right" size="default" :inline="true">
      <el-button @click="addTrigger">添加触发器</el-button>
      <div v-for="(trigger, key) in props.triggerList" :key="key">
        <el-form-item label="选择属性">
          <el-input v-model="trigger.tag" type="string" class="w-30 m-1" placeholder="请输入属性" />
        </el-form-item>
        <el-form-item label="最小值">
          <el-input v-model="trigger.min" class="w-30 m-1" placeholder="最小值" />
        </el-form-item>
        <el-form-item label="最大值">
          <el-input v-model="trigger.max" class="w-30 m-1" placeholder="最大值" />
        </el-form-item>
        <el-form-item label="执行动效">
          <el-select
            v-model="trigger.animationsType"
            class="w-50 m-2"
            placeholder="选择动效"
            size="large"
          >
            <el-option
              v-for="item in animationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script setup lang="ts">
  import { ElForm, ElFormItem, ElInput, ElSelect, ElOption } from 'element-plus';
  import { ref, PropType } from 'vue';
  //   import { useConfigStore } from '@/store/config';
  // import { useGlobalStore } from '@/store/global';
  import { ITrigger, EConfigAnimationsType } from '@/config-center/types';
  //   import { EGlobalStoreIntention } from '@/store/global/types';
  //   const configStore = useConfigStore();
  // const globalStore = useGlobalStore();
  // const judgeOptions = ref([
  //   { label: '等于', value: 'EQU' },
  //   { label: '不等于', value: 'NEQ' },
  //   { label: '小于', value: 'LSS' },
  //   { label: '小于或等于', value: 'LEQ' },
  //   { label: '大于', value: 'GTR' },
  //   { label: '大于或等于', value: 'GEQ' }
  // ]);
  const animationOptions = ref([
    {
      label: '无',
      value: EConfigAnimationsType.None
    },
    {
      label: '顺时针旋转',
      value: EConfigAnimationsType.RotateIn
    },
    {
      label: '逆时针旋转',
      value: EConfigAnimationsType.RotateOut
    },
    {
      label: '心跳',
      value: EConfigAnimationsType.HeartBeat
    },
    {
      label: '弹跳',
      value: EConfigAnimationsType.Bounce
    },
    {
      label: '闪光',
      value: EConfigAnimationsType.Flash
    },
    {
      label: '脉冲',
      value: EConfigAnimationsType.Pulse
    },
    {
      label: '橡皮筋',
      value: EConfigAnimationsType.RubberBand
    },
    {
      label: 'X轴摇晃',
      value: EConfigAnimationsType.ShakeX
    },
    {
      label: 'Y轴摇晃',
      value: EConfigAnimationsType.ShakeY
    },
    {
      label: '摇头',
      value: EConfigAnimationsType.HeadShake
    },
    {
      label: '秋千摇摆',
      value: EConfigAnimationsType.Swing
    },
    {
      label: '惊讶抖动',
      value: EConfigAnimationsType.Tada
    },
    {
      label: '晃动',
      value: EConfigAnimationsType.Wobble
    },
    {
      label: '果冻弹跳',
      value: EConfigAnimationsType.Jello
    }
  ]);
  const props = defineProps({
    triggerList: {
      type: Object as PropType<ITrigger[]>,
      default: () => {}
    }
  });
  // const triggerListP = ref<ITrigger[]>([
  //   {
  //     tag: '',
  //     max: undefined,
  //     min: undefined,
  //     animationsType: EConfigAnimationsType.None
  //   }
  // ]);
  const emits = defineEmits(['update-trigger-list-val']);
  const addTrigger = () => {
    emits('update-trigger-list-val');
  };
</script>
