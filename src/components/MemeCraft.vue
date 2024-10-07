<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const imageSources = ref<string[]>([])

import api from '../utils/api'

const imagePath = ref<string>('')
const images = ref<File[]>([])
const texts = ref<string[]>([''])
const status = ref<string>('')

const imageSrc = ref<string>('')

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    images.value = Array.from(target.files)
  }
}

const addTextField = () => {
  texts.value.push('')
}

const handleSubmit = async () => {
  status.value = '上传中...'

  const formData = new FormData()
  images.value.forEach((image) => {
    formData.append('images', image)
  })
  formData.append(
    'texts',
    JSON.stringify(texts.value.filter((text) => text.trim() !== '')),
  )

  try {
    const response = await api.post('/memes/test', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
    })
    // response.data是一个图片的二进制数据，将其在页面上显示
    imageSrc.value = URL.createObjectURL(new Blob([response.data]))
    status.value = '上传成功！'
    console.log(response.data)
  } catch (error) {
    status.value = '上传失败。'
    console.error('错误:', error)
  }
}

onMounted(async () => {})
</script>

<template>
  <div class="hello-world">
    <h2>hello-world1</h2>
    <h2>meme 表情包生成器</h2>
    <img
      v-for="(src, index) in imageSources"
      :key="index"
      :src="src"
      alt="Generated image"
    />
    <img :src="imagePath" alt="" />

    <form @submit.prevent="handleSubmit" class="upload-form">
      <div>
        <label for="image-upload">上传图片：</label>
        <input
          type="file"
          id="image-upload"
          multiple
          @change="handleImageChange"
          accept="image/*"
        />
      </div>
      <div v-for="(_text, index) in texts" :key="index">
        <input
          type="text"
          v-model="texts[index]"
          :placeholder="`文本 ${index + 1}`"
        />
      </div>
      <button type="button" @click="addTextField">添加文本字段</button>
      <button type="submit">上传</button>
      <p v-if="status">{{ status }}</p>
    </form>
    <div>
      结果：
      <img :src="imageSrc" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bgc {
  background-color: #f00;
}
</style>

vue
