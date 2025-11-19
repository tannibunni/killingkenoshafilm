/**
 * 应用配置
 */
export const appConfig = {
  // 密码配置
  password: {
    default: '123456'
  },
  
  // 联系信息
  contact: {
    email: 'mattorftv@gmail.com',
    subject: "Hi I'd like to watch your documentory"
  },
  
  // EmailJS 配置
  emailjs: {
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
  },
  
  // Google Sheets 配置
  googleSheets: {
    webAppUrl: import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL || ''
  },
  
  // 视频播放器配置
  video: {
    playerUrl: 'https://player.vdocipher.com/v2/',
    otp: '20160313versASE3232o4a13isj6G8ICpLvM4RIsB9F64SHJhjuDq7HtCEhdSYLs',
    playbackInfo: 'eyJ2aWRlb0lkIjoiYzU0NWYwMjdkNzQxNjVkN2NmMTc2MGM1YzI4ZDkyNjEifQ==',
    getVideoUrl(startTime = 0) {
      const baseUrl = `${this.playerUrl}?otp=${this.otp}&playbackInfo=${this.playbackInfo}`;
      return startTime > 0 ? `${baseUrl}&startTime=${startTime}` : baseUrl;
    }
  },
  
  // 章节数据
  episodes: [
    {
      id: 'intro',
      title: 'Intro',
      timeRange: '00:00 - 01:00',
      description: 'Introduction',
      startTime: 0,
      isActive: true
    },
    {
      id: 'episode1',
      title: 'Episode 1',
      timeRange: '01:00 - 40:00',
      description: 'The Protests',
      startTime: 60
    },
    {
      id: 'episode2',
      title: 'Episode 2',
      timeRange: '40:00 - 60:00',
      description: '"The Murder"',
      startTime: 2400
    },
    {
      id: 'episode3',
      title: 'Episode 3',
      timeRange: '60:00 - 120:00',
      description: '"the Martyr"',
      startTime: 3600
    }
  ],
  
  // 纪录片信息
  documentary: {
    title: 'Killing Kenosha - Documentary',
    description: "The fiery story of the 2020 Kenosha riots",
    posterImage: '/poster.jpeg',
    heroBackground: '/background.JPG'
  },
  
  // 分享配置
  share: {
    platforms: ['facebook', 'twitter', 'instagram', 'linkedin', 'reddit', 'email'],
    shareKey: 'tVpBg-E_ZKi7NDdu2T1VBA',
    host: ''
  },
  
  // PostHog配置
  analytics: {
    enabled: true,
    apiKey: 'phc_t9tkQZJiyi2ps9zUYm8TDsL6qXo4YmZx0Ot5rBlAlEd',
    apiHost: 'https://us.i.posthog.com'
  }
}

export const documentaryConfig = appConfig.documentary

