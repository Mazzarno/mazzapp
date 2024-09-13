<template>
  <TresGroup :position="[0, 2, 0.7]">
    <Suspense>
      <Text3D
        text="ALEXIS"
        :font="despairFont"
        :size="textSize"
        :height="textHeight"
        :curveSegments="textCurveSegments"
        :bevelThickness="textBevelThickness"
        :bevelSize="textBevelSize"
        center
        castShadow
      >
        <TresMeshStandardMaterial color="#f8f9fa" />
      </Text3D>
    </Suspense>
  </TresGroup>

  <TresGroup :position="[0, -2, 0.7]">
    <Suspense>
      <Text3D
        text="GERMAIN"
        :font="despairFont"
        :size="textSize"
        :height="textHeight"
        :curveSegments="textCurveSegments"
        :bevelThickness="textBevelThickness"
        :bevelSize="textBevelSize"
        center
        castShadow
      >
        <TresMeshStandardMaterial color="#f8f9fa" />
      </Text3D>
    </Suspense>
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
const speedLevio = 2;
const rotationLevio = 2;
const floatLevio = 2;
const despairFont = "fonts/Despairs1.json";

const textSize = 3;
const textHeight = 0.2;
const textCurveSegments = 10;
const textBevelThickness = 0.5;
const textBevelSize = 0.02;
</script>
