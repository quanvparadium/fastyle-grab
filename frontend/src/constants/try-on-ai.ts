export const modelData: string[] = [
<<<<<<< HEAD
  'https://res.cloudinary.com/trkha1609/image/upload/v1716286802/model/dmtlbq0xulfzgfpsohud.png',
  'https://res.cloudinary.com/trkha1609/image/upload/v1716286078/model/adosleugqxlhagpdvsmf.png',
]
=======
  'https://levihsu-ootdiffusion.hf.space/--replicas/sfxdg/file=/tmp/gradio/2e0cca23e744c036b3905c4b6167371632942e1c/model_1.png',
  'https://levihsu-ootdiffusion.hf.space/--replicas/sfxdg/file=/tmp/gradio/ba5ba7978e7302e8ab5eb733cc7221394c4e6faf/model_5.png',
  'https://levihsu-ootdiffusion.hf.space/--replicas/sfxdg/file=/tmp/gradio/522d747ad4a6e8c4b1d0531babaa5043a293df6b/model_7.png',
]

export const API_KEY: string = process.env.NEXT_PUBLIC_TRY_ON_AI_API_KEY || ''

export const FASHION_ENDPOINT: string =
  process.env.NEXT_PUBLIC_TRY_ON_AI_FASHION_ENDPOINT || ''

export const fashionParams = {
  key: API_KEY,
  prompt: 'A realistic photo of a model wearing a beautiful white top.',
  negative_prompt: 'Low quality, unrealistic, bad cloth, warped cloth',
  init_image:
    'https://levihsu-ootdiffusion.hf.space/--replicas/sfxdg/file=/tmp/gradio/2e0cca23e744c036b3905c4b6167371632942e1c/model_1.png',
  cloth_image:
    'https://img.lazcdn.com/g/p/1abcf47c99db317aa12d4bedf4ff716e.jpg_720x720q80.jpg',
  cloth_type: 'upper_body',
  height: 512,
  width: 384,
  guidance_scale: 8.0,
  num_inference_steps: 20,
  seed: 128915590,
  temp: 'no',
  webhook: null,
  track_id: null,
}
>>>>>>> main
