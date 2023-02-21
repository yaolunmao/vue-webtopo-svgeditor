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
  import { ITrigger } from '@/config-center/types';
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
    { label: '无', value: 'None' },
    { label: '电流', value: 'Electricity' },
    { label: '水珠', value: 'WaterDrop' },
    { label: '轨迹', value: 'Track' },
    { label: '旋转', value: 'Rotate' }
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
