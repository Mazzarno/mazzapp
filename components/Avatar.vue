<script setup lang="ts">
import { ref } from "vue";
import { useAnimations, useGLTF } from "@tresjs/cientos";
import { useTexture } from "@tresjs/core";
const { onLoop } = useRenderLoop();
const { $gsap } = useNuxtApp();
const { scene: mazzar } = await useGLTF("models/mazzar.glb");
const codeTexture = await useTexture({
  map: "textures/code.png",
});
const officeRef = ref();
const avatarRef = ref();
// POSITIONS
const officePos = [2.5, 2, -2];
const officeScale = 9;

// Load FBX animations and assign names
const { animations: typingAnimation } = await useFBX("animations/Typing.fbx");
const { animations: fallingAnimation } = await useFBX("animations/Falling.fbx");
const { animations: landingAnimation } = await useFBX("animations/Landing.fbx");
const { animations: stretchingAnimation } = await useFBX(
  "animations/Stretching.fbx"
);
const { animations: standingAnimation } = await useFBX(
  "animations/Standing.fbx"
);
typingAnimation[0].name = "typing";
fallingAnimation[0].name = "falling";
landingAnimation[0].name = "landing";
stretchingAnimation[0].name = "stretching";
standingAnimation[0].name = "standing";
const { actions, mixer } = useAnimations(typingAnimation, mazzar);

let currentAction = ref(actions.typing);
currentAction.value.loop;
currentAction.value.play();
function testClick() {}

onMounted(async () => {
  await nextTick();
  onLoop(() => {});
});

/*
// Setup animations using useAnimations
const { actions } = useAnimations(
  [
    typingAnimation[0],
    fallingAnimation[0],
    landingAnimation[0],
    stretchingAnimation[0],
    standingAnimation[0],
  ],
  mazzar
);

// Array of animation actions
const animationActions = [
  actions.typing,
  actions.falling,
  actions.stretching,
  actions.landing,
];

onMounted(async () => {
  await nextTick();
  actions.typing.play();
});


// Example function to switch animation on click
function onAvatarClick() {
  animationActions[0].fadeOut(1);
  animationActions[1].fadeIn(1).play();

  // Apply GSAP transformations if needed
  $gsap.to(officeRef.value.scale, {
    y: 0,
    x: 0,
    z: 0,
    duration: 1,
  });
  $gsap.to(avatarRef.value.position, {
    y: -20,
    x: 0,
    z: 0,
    duration: 5,
  });
  $gsap.to(avatarRef.value.rotation, {
    y: -2.5,
    x: 0,
    z: 0,
    duration: 5,
  });
}
  */
</script>

<template>
  <TresGroup ref="avatarRef">
    <primitive
      cast-shadow
      :object="mazzar"
      :scale="3"
      :rotation-y="2.5"
      @click="testClick"
    />
  </TresGroup>
  <TresGroup ref="officeRef">
    <TresMesh :position="[1.9, 2.95, -1.7]" :rotation="[0, -0.7, 0]">
      <TresPlaneGeometry :args="[1.9, 1.1]" />
      <TresMeshStandardMaterial :map="codeTexture.map" />
    </TresMesh>
    <GLTFModel
      cast-shadow
      path="models/Office.glb"
      :scale="officeScale"
      :rotation-y="-1"
      :position="officePos"
    />
  </TresGroup>
</template>
