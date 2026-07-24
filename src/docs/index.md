---
layout: page
---

<script setup>
import { buildDocCards } from '../../.vitepress/theme/utils/docs-nav'

const cards = buildDocCards()
</script>

# 文档

欢迎来到 USTCraft 主页文档站。这里精选的文档涵盖面向新玩家的服务器游玩指南、社区历史记录以及社团事务档案，帮助你快速融入 USTC Minecraft 社区。

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; padding: 2rem 0;">

<LinkCard v-for="card in cards" :key="card.url" :link="card" />

</div>

