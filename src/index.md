---
layout: page
hasHero: true
---

<HomeHero
  title="USTCraft"
  subtitle="像素艺术小组"
  description="探索 Minecraft 与学科交叉的各种可能，构建创意与技术交融的活力社区。"
  logo="/logo.png"
  :backgrounds="['/background/general/ustcmc-next.jpg']"
  :interval="4000"
/>


## 最新新闻

<script setup>
import { buildNewsCards } from '../.vitepress/theme/utils/news-utils'

const latestNews = buildNewsCards().slice(0, 2)
</script>

<NewsCard
  v-for="card in latestNews"
  :key="card.link"
  :title="card.title"
  :brief="card.brief"
  :image="card.image"
  :link="card.link"
/>

[查看全部新闻 →](/news/)


<HomeIntro
  title="USTCMC 社区"
  description="十余年来，USTC Minecraft 社区以推动服务器周目为主线，探索原版生存、特色模组玩法、虚拟社区建设等内容，并穿插小游戏、建筑复刻、社区比赛等特色项目，成为科大「规模最大」「技术浓度最高」的「游戏」类群聊。"
  image="/background/101/1.jpg"
/>

<HomeIntro
  title="USTCraft 社团"
  description="由中国科大 Minecraft 爱好者们组织而成的院级社团，于 2025 年 12 月宣告成立。"
  image="/background/group/ustcraft.jpg"
  :right="true"
/>

<HomeIntro
  title="方块科大"
  description="利用 Minecraft 还原和创造中国科大的校园景观，展示科大的历史文化和创新精神，增进科大人之间的交流与互动"
  image="/background/cube/ustcube.jpg"
/>

<HomeIntro
  title="了解更多"
  description=
  "点击上方导航栏的「关于」了解更多关于 USTCraft 的信息，点击「文档」以加入我们，畅玩服务器~"
  image="/background/general/ustcmc-next.jpg"
  :right="true"
/>
