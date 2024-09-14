<template>
  <TresGroup :position="position">
    <Suspense>
      <Text3D
        ref="textRef"
        :text="letter"
        :font="despairFont"
        :size="textSize"
        :height="textHeight"
        :curveSegments="textCurveSegments"
        :bevelThickness="textBevelThickness"
        :bevelSize="textBevelSize"
        center
        castShadow
      >
        <TresMeshStandardMaterial :color="color" />
      </Text3D>
    </Suspense>
  </TresGroup>
</template>

<script setup>
import { defineProps } from "vue";
import { Text3D } from "@tresjs/cientos";
const textRef = ref();
const props = defineProps({
  letter: {
    type: String,
    required: true,
  },
  position: {
    type: Array,
    default: () => [0, 0, 0],
  },
  color: {
    type: String,
    default: "#f8f9fa",
  },
});
const despairFont = "fonts/Despairs1.json";
const textSize = 3;
const textHeight = 0.2;
const textCurveSegments = 10;
const textBevelThickness = 0.5;
const textBevelSize = 0.02;
defineExpose({ textRef });
</script>
