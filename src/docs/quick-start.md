---
layout: page
title: 快速开始
sidebarGroup: 入门指南
sidebarGroupOrder: 1
sidebarOrder: 1
cardDescription: 从下载 Java 和启动器开始，配置外置登录，加入 USTC 服务器游玩。
cardImage: /background/44.jpg
---

# 启动 Minecraft 

习惯了日常启动 Minecraft 游玩，但是一时忘记了电脑里的这个 Minecraft 是怎么来的？~~可以阅读这一节教程复习一下。~~

教程环境默认为 Windows 10/11。我们约定，安装的特定 Minecraft 版本（如特定原版版本，特定整合包等）称为一个游戏**实例**。

## 下载 Java

有很多途径可以获取 Java 运行时环境，包括手动下载以及启动器自动配置。这里我们介绍手动方法。

前往 Oracle 下载：https://www.oracle.com/cn/java/technologies/downloads

<PixelImage src="/static/2026/07/start-0.png" caption="Oracle JDK 下载页面" />

下拉到这里选择 JDK 版本和操作系统环境，再选择对应版本下载。

Minecraft 不同版本有最低 Java 版本要求：

|**Minecraft 版本**|**最低 Java 版本**|
|---|---|
|26\.1 以及更新|25|
|1\.20\.5 \- 1\.21\.11|21|
|1\.18 \- 1\.20\.4|17|
|1\.17 \- 1\.17\.1|16|
|1\.17 之前|8|

示例：希望在 Windows 11 环境游玩 Minecraft 26\.1\.2，选择【JDK 25】【Windows】，应该下载【x64 Installer】再安装。

<PixelImage src="/static/2026/07/start-4.png" caption="Java 版本选择" />

## 下载启动器

一般不使用官方启动器，而是使用功能更丰富、更容易管理的第三方启动器，如 HMCL、PCL 等。

HMCL 下载：

前往 https://hmcl.huangyuhui.net/download/ 按指示选择对应的操作系统版本下载。

PCL 下载：

前往 https://afdian.com/p/0164034c016c11ebafcb52540025c377 选择合适的下载地址下载。PCL 下载是免费的。

**所有声称「支付以获取启动器」的均为诈骗。**

为保持目录有序，建议将启动器移动到专门的文件夹里。

## 启动器基本操作

<PixelImage src="/static/2026/07/start-3.jpg" caption="HMCL 启动器主界面" />

以 HMCL 为例，在安装 Java 和获取启动器后，可以直接运行，典型界面如上。

### 配置账户

<PixelImage src="/static/2026/07/start-2.jpg" caption="HMCL 账户配置" />

点【账户】即可配置登录。这里便可以按照指示登录微软账户（正版），或者使用离线模式创建临时角色。

【添加认证服务器】部分请见下文。

### 下载游戏内容

<PixelImage src="/static/2026/07/start-1.jpg" caption="HMCL 内置下载页面" />

回主页点【下载】即可获取 Minecraft 内容，包括直接下载、从整合包安装。

## 启动

回到主页在右下角点【启动游戏】，经过必要文件下载后，一段时间即可看到 Minecraft 主界面。

---

# 配置外置登录

外置登录（习惯称为皮肤站）是一种替代正版和离线登录的方式。USTC Minecraft 的多数服务器要求使用特定皮肤站登录。

以 LyerSkin 为例。前往 https://auth.lylighte.cc 点首页【即刻注册】注册用户（请联系站长获取邀请码）。

<PixelImage src="/static/2026/07/external-1.jpg" caption="皮肤站注册页面" />

在【角色管理】创建新角色（并删除预置角色），在【我的衣柜】上传自定义皮肤和披风（或在【皮肤库】寻找喜欢的添加到衣柜），选择皮肤或披风并应用到角色。

记下你注册的账户、密码、在皮肤站的角色名。

<PixelImage src="/static/2026/07/external-2.png" caption="LyerSkin 导航栏" />

<PixelImage src="/static/2026/07/external-3.png" caption="角色管理" width="600" />

<PixelImage src="/static/2026/07/external-4.png" caption="材质管理" width="600" />

回到启动器配置外置登录。

### 一步到位的配置方法

对于任一安装好游戏实例的启动器，在【仪表盘】找到【快速接入启动器】：

<PixelImage src="/static/2026/07/external-5.png" caption="快速接入启动器" />

把蓝色按钮拖拽到启动器窗口里。随后输入账号密码登录，选择角色。

以下介绍主流启动器的手动配置方法。

### HMCL

对于 HMCL，在【账户】中选择【添加认证服务器 \- 外置登录】，填入认证地址 `https://auth.lylighte.cc/skinapi` 并确认。

<PixelImage src="/static/2026/07/external-6.png" caption="HMCL 添加认证服务器" width="300" />

<PixelImage src="/static/2026/07/external-7.png" caption="HMCL 确认添加" width="400" />

确认添加后，在左侧选择【添加账户 \- LyerSkin】，输入刚才的账号密码，选择角色，于是皮肤站配置完成。

<PixelImage src="/static/2026/07/external-8.png" caption="HMCL 选择账户" width="400" />

### PCL

PCL 配置的流程比较特别。你需要安装好一个游戏版本，然后才能为它配置外置登录。

在【版本设置】→【设置】中，设置【服务器】【登录方式】为【第三方登录】，填入认证服务器（必填）`https://auth.lylighte.cc/skinapi`。

<PixelImage src="/static/2026/07/external-9.png" caption="PCL 第三方登录配置" width="600" />

确认添加后，在首页输入刚才的账号密码，选择角色，于是皮肤站配置完成。

---

# 添加服务器

USTC Minecraft 社区有多个服务器，请根据群公告要求，选择特定 Minecraft 版本和认证方式。

选择皮肤站角色后启动相应版本 Minecraft。按照群公告提供的服务器地址，在多人游戏添加服务器，填入即可。

## 群公告阅读指南

一般服务器信息会在群公告里列举出来。需要关注的信息有：

- 版本号
- 服务器地址
- 是否为原版或整合包
- 是否要正版验证/外置登录

请基于这些信息配置正确的 Minecraft 版本和登录方式，由此进入服务器游玩。
