<script setup lang="ts">
</script>

<template>
  <pre>{{ jsonAsString }}</pre>
</template>

<script lang="ts">
import {defineComponent, PropType, Ref, ref} from 'vue';

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<unknown>,
      required: true,
    }
  },
  setup(props) {
    const jsonAsString: Ref<string> = ref('');

    if (props.data) {
      if (typeof props.data === 'string') {
        jsonAsString.value = props.data;
      } else {
        jsonAsString.value = JSON.stringify(props.data, undefined, 2);
        console.log('Converted', props.data, 'to:\n', props.data);
        // jsonAsString.value = "abc\ndef";
        // jsonAsString.value = JSON.stringify("abc\ndef", undefined, 2);

      }
    }

    return {
      jsonAsString,
    };
  },
})
</script>

<style scoped>
</style>
