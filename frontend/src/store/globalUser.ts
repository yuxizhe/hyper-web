import { makeAutoObservable } from 'mobx'

class GlobalUser {
  userInfo: Partial<User.UserEntity> = {}
  constructor() {
    makeAutoObservable(this)
  }

  async getUserDetail() {
    // const res = await getCurrentUserInfo()
    // this.userInfo = res?.data
    // new WebSee(res?.data?.username)
    this.userInfo = {
      roles: [
        {
          id: 5,
          name: '超级管理员',
          description: '拥有所有查看和操作功能',
          adminCount: 0,
          status: 1,
          sort: 5
        }
      ],
      icon: 'http://jinpika-1308276765.cos.ap-shanghai.myqcloud.com/bootdemo-file/20221220/src=http___desk-fd.zol-img.com.cn_t_s960x600c5_g2_M00_00_0B_ChMlWl6yKqyILFoCACn-5rom2uIAAO4DgEODxAAKf7-298.jpg&refer=http___desk-fd.zol-img.com.png',
      username: 'admin'
    }
  }

  setUserInfo(user: Partial<User.UserEntity>) {
    this.userInfo = user
  }
}

export const storeGlobalUser = new GlobalUser()
