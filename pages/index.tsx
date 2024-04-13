import CustomImage from "~/custom-image";

export default function Home() {
  return (
    <div
        style={{
          display: "grid",
          gridAutoFlow: "row",
          height: "100vh",
          width: "100%",
        }}
    >
      <CustomImage
          imageKey={"54fb75c3-952d-48e9-b6be-9b0fa798751e"}
          forcedPoint={2000}
      />
      <CustomImage imageKey={"a7e76dce-8d8c-4867-a602-6b35ee8a2ba7"} />
      <CustomImage imageKey={"978035ed-3750-4086-867c-be2b0e7cdb61"} />
    </div>
  );
}
