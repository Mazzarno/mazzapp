<template>
  <TresGroup :position="[0, 2, 0.7]">
    <TresGroup ref="letter1">
      <Letter letter="A" :position="[-6, 0, 0]" />
    </TresGroup>
    <TresGroup ref="letter2">
      <Letter letter="L" :position="[-3.1, 0, 0]" />
    </TresGroup>
    <TresGroup ref="letter3">
      <Letter letter="E" :position="[-0.6, 0, 0]" />
    </TresGroup>
    <TresGroup ref="letter4">
      <Letter letter="X" :position="[2.4, 0, 0]" />
    </TresGroup>
    <TresGroup ref="letter5">
      <Letter letter="I" :position="[4.3, 0, 0]" />
    </TresGroup>
    <TresGroup ref="letter6">
      <Letter letter="S" :position="[6.2, 0, 0]" />
    </TresGroup>
  </TresGroup>

  <TresGroup :position="[1, -2, 0.7]">
    <TresGroup ref="letter7">
      <Letter letter="G" :position="[-9, 0, 0]" />
    </TresGroup>
    <TresGroup ref="letter8">
      <Letter letter="E" :position="[-6, 0, 0]" />
    </TresGroup>
    <TresGroup ref="letter9">
      <Letter letter="R" :position="[-3.3, 0, 0]" />
    </TresGroup>
    <TresGroup ref="letter10">
      <Letter letter="M" :position="[0, 0, 0]" />
    </TresGroup>
    <TresGroup ref="letter11">
      <Letter letter="A" :position="[3.3, 0, 0]" />
    </TresGroup>
    <TresGroup ref="letter12">
      <Letter letter="I" :position="[5.35, 0, 0]" />
    </TresGroup>
    <TresGroup ref="letter13">
      <Letter letter="N" :position="[7.5, 0, 0]" />
    </TresGroup>
  </TresGroup>

  <TresGroup :position="[-16, 4, 1]">
    <Levioso
      :speed="speedLevio"
      :rotation-factor="rotationLevio"
      :float-factor="floatLevio"
    >
      <Suspense>
        <Text3D
          ref="textRefs.exclamation"
          :font="despairFont"
          text="?"
          size="3"
          curveSegments="10"
          rotation-y="-0.5"
          castShadow
        >
          <TresMeshStandardMaterial color="#f8f9fa" />
        </Text3D>
      </Suspense>
    </Levioso>
  </TresGroup>

  <TresGroup :position="[-14, -2, 1]">
    <Levioso
      :speed="speedLevio"
      :rotation-factor="rotationLevio"
      :float-factor="floatLevio"
    >
      <Suspense>
        <Text3D
          text="<"
          :font="despairFont"
          size="3"
          curve-segments="10"
          rotation-y="-0.5"
          @click="transformText('lessThan')"
          castShadow
        >
          <TresMeshStandardMaterial color="#f8f9fa" />
        </Text3D>
      </Suspense>
    </Levioso>
  </TresGroup>
  <TresGroup :position="[16, -4, 1]">
    <Levioso
      :speed="speedLevio"
      :rotation-factor="rotationLevio"
      :float-factor="floatLevio"
    >
      <Suspense>
        <Text3D
          text="/"
          :font="despairFont"
          size="2"
          curve-segments="10"
          rotation-y="0.5"
          position-x="-1.5"
          @click="transformText('slash')"
          castShadow
        >
          <TresMeshStandardMaterial color="#f8f9fa" />
        </Text3D>
      </Suspense>
    </Levioso>
    <Levioso
      :speed="speedLevio"
      :rotation-factor="rotationLevio"
      :float-factor="floatLevio"
    >
      <Suspense>
        <Text3D
          text=">"
          :font="despairFont"
          size="3"
          curve-segments="10"
          rotation-y="0.5"
          castShadow
        >
          <TresMeshStandardMaterial color="#f8f9fa" />
        </Text3D>
      </Suspense>
    </Levioso>
  </TresGroup>
  <TresGroup :position="[14, 2, 1]">
    <Levioso
      :speed="speedLevio"
      :rotation-factor="rotationLevio"
      :float-factor="floatLevio"
    >
      <Suspense>
        <Text3D
          text="@"
          :font="despairFont"
          size="3"
          curveSegments="10"
          rotation-y="0.5"
          castShadow
        >
          <TresMeshStandardMaterial color="#f8f9fa" />
        </Text3D>
      </Suspense>
    </Levioso>
  </TresGroup>
</template>

<script setup>
import { gsap } from "gsap";
const speedLevio = 2;
const rotationLevio = 2;
const floatLevio = 2;
const despairFont = "fonts/Despairs1.json";
const textSize = 3;
const textHeight = 0.2;
const textCurveSegments = 10;
const textBevelThickness = 0.5;
const textBevelSize = 0.02;
const letter1 = ref(null);
const letter2 = ref(null);
const letter3 = ref(null);
const letter4 = ref(null);
const letter5 = ref(null);
const letter6 = ref(null);
const letter7 = ref(null);
const letter8 = ref(null);
const letter9 = ref(null);
const letter10 = ref(null);
const letter11 = ref(null);
const letter12 = ref(null);
const letter13 = ref(null);

onMounted(() => {
  const timeline = gsap.timeline({ delay: 1 });
  const letters = [
    letter1,
    letter2,
    letter3,
    letter4,
    letter5,
    letter6,
    letter7,
    letter8,
    letter9,
    letter10,
    letter11,
    letter12,
    letter13,
  ];

  letters.forEach((letterRef, index) => {
    const letter = letterRef.value;
    if (letter && letter.position) {
      timeline.fromTo(
        letter.position,
        { z: -1.4, opacity: 0 },
        {
          opacity: 1,
          z: 0,
          duration: 1.5,
          ease: "power2.out",
          yoyo: true,
        },
        index * 0.1
      );
    }
  });
});
</script>
