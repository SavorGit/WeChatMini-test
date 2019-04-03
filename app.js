//app.js
App({
  connectHotelwifi: function (openid,wifi_mac, wifi_name, use_wifi_password, intranet_ip,that,jump_url='',forscreen_type=0) {
    if (wifi_mac == '') {//如果后台未填写wifi_mac  获取wifi列表自动链接
      wx.startWifi({
        success: function (reswifi) {
          wx.getWifiList({
            success: function (et) {
              wx.onGetWifiList(function (ret) {
                var wifilist = ret.wifiList;
                for (var i = 0; i < ret.wifiList.length; i++) {
                  if (wifi_name == wifilist[i]['SSID']) {
                    wx.connectWifi({
                      SSID: wifilist[i]['SSID'],
                      BSSID: wifilist[i]['BSSID'],
                      password: use_wifi_password,
                      success: function (ressuc) {
                        that.setData({
                          is_link_wifi: 1,
                          hiddens:true,
                        })
                      },
                      fail: function (resfail) {
                        that.setData({
                          is_link_wifi: 0,
                        })
                      }
                    })
                    break;
                  }
                }
              })
            }
          })
        }
      })
    } else {//如果后台填写了wifi_mac直接链接
      wx.startWifi({
        success: function (rts) {
         
          wx.connectWifi({
            SSID: wifi_name,
            BSSID: wifi_mac,
            password: use_wifi_password,
            success: function (reswifi) {
             
              if (reswifi.errCode == 12006){
                
                wx.showToast({
                  title: '请打开您手机的GPS定位开关',
                  icon: 'none',
                  
                  duration: 5000,
                  
                })
                that.setData({
                  hiddens: true,
                  img_disable: false,
                  video_disable: false,
                  birthday_disable: false,
                  showRetryModal: true,
                })
                
              } else if (reswifi =='getConnectedWifi erro'){
                wx.showToast({
                  title: '请打开您的wifi',
                  icon: 'none',
                  duration: 2000
                });
                that.setData({
                  hiddens: true,
                  img_disable: false,
                  video_disable: false,
                  birthday_disable: false,
                  showRetryModal: true,
                })
              }
              else {
                wx.getConnectedWifi({
                  success: function (scres) {
                    if (scres.wifi.SSID == wifi_name) {//如果当前连接wifi正确
                      if (forscreen_type == 0) {
                        wx.showToast({
                          title: 'wifi链接成功',
                          icon: 'none',
                          duration: 5000
                        });
                      }

                      if (jump_url != '') {
                        wx.navigateTo({
                          url: jump_url,
                        })
                        if (forscreen_type == 1) {//图片投屏
                          that.setData({
                            img_disable: false,
                            video_disable: false,
                            birthday_disable: false,
                            hiddens: true,
                            is_link_wifi: 1,
                          })
                        } else if (forscreen_type == 2) {//视频投屏
                          that.setData({
                            img_disable: false,
                            video_disable: false,
                            birthday_disable: false,
                            hiddens: true,
                            is_link_wifi: 1,
                          })
                        } else if (forscreen_type == 3) {  //生日歌点播
                          that.setData({
                            img_disable: false,
                            video_disable: false,
                            birthday_disable: false,
                            hiddens: true,
                            is_link_wifi: 1,
                          })
                        } else {  //首页加载
                          that.setData({
                            is_link_wifi: 1,
                            hiddens: true,
                            img_disable: false,
                            video_disable: false,
                            birthday_disable: false,
                            showRetryModal: false, //连接WIFI重试弹窗
                          })
                        }

                      } else {    //首页加载
                        that.setData({
                          is_link_wifi: 1,
                          hiddens: true,
                          img_disable: false,
                          video_disable: false,
                          birthday_disable: false,
                          showRetryModal: false, //连接WIFI重试弹窗
                        })
                      }
                      /*if(forscreen_type==0){
                        var time_sec = 6000;
                      }else {
                        var time_sec = 0;
                      }
                      var timeOut = setTimeout(function () {
                        wx.request({
                          url: "http://" + intranet_ip + ":8080/h5Test?deviceId=" + openid + "&web=true",
                          success: function (res) {
                            console.log('ddd');
                            if (forscreen_type == 0) {
                              wx.showToast({
                                title: 'wifi链接成功',
                                icon: 'none',
                                duration: 5000
                              });
                            }
  
                            if (jump_url != '') {
                              wx.navigateTo({
                                url: jump_url,
                              })
                              if (forscreen_type == 1) {//图片投屏
                                that.setData({
                                  img_disable: false,
                                  video_disable: false,
                                  birthday_disable: false,
                                  hiddens: true,
                                  is_link_wifi: 1,
                                })
                              } else if (forscreen_type == 2) {//视频投屏
                                that.setData({
                                  img_disable: false,
                                  video_disable: false,
                                  birthday_disable: false,
                                  hiddens: true,
                                  is_link_wifi: 1,
                                })
                              } else if (forscreen_type == 3) {  //生日歌点播
                                that.setData({
                                  img_disable: false,
                                  video_disable: false,
                                  birthday_disable: false,
                                  hiddens: true,
                                  is_link_wifi: 1,
                                })
                              } else {  //首页加载
                                that.setData({
                                  is_link_wifi: 1,
                                  hiddens: true,
                                  img_disable: false,
                                  video_disable: false,
                                  birthday_disable: false,
                                  showRetryModal: false, //连接WIFI重试弹窗
                                })
                              }
  
                            } else {    //首页加载
                              that.setData({
                                is_link_wifi: 1,
                                hiddens: true,
                                img_disable: false,
                                video_disable: false,
                                birthday_disable: false,
                                showRetryModal: false, //连接WIFI重试弹窗
                              })
                            }
                          },
                          fail: function ({ errMsg }) {
  
                            if (forscreen_type == 0) {
                              that.setData({
                                hiddens: true,
                                img_disable: false,
                                video_disable: false,
                                birthday_disable: false,
                              })
                            } else if (forscreen_type == 1) {
                              that.setData({
                                hiddens: true,
                                img_disable: false,
                                video_disable: false,
                                birthday_disable: false,
                              })
                            } else if (forscreen_type == 2) {
                              that.setData({
                                hiddens: true,
                                img_disable: false,
                                video_disable: false,
                                birthday_disable: false,
                              })
                            } else if (forscreen_type == 3) {
                              that.setData({
                                hiddens: true,
                                img_disable: false,
                                video_disable: false,
                                birthday_disable: false,
                              })
                            }
  
                            
                            that.setData({
                              showRetryModal: true,
                              wifi_name: wifi_name,
                            })
                          },
                        })
                      }, time_sec)*/

                    } else { //当前连接的wifi不是当前包间wifi

                      that.setData({
                        
                        hiddens: true,
                        img_disable: false,
                        video_disable: false,
                        birthday_disable: false,
                        showRetryModal: true,
                      })
                    }
                  }, fail: function (res) {
                    that.setData({
                      hiddens: true,
                      img_disable: false,
                      video_disable: false,
                      birthday_disable: false,
                      showRetryModal: true,
                    })
                  }
                }) 
              }
              
            },
            fail: function (resfail) {
              that.setData({
                hiddens:true,
                img_disable: false,
                video_disable: false,
                birthday_disable:false,
                showRetryModal: true,
              })
            }
          })
        },
        fail:function(res){
          wx.showToast({
            title: '请打开您的wifi',
            icon: 'none',
            duration: 2000
          });
          that.setData({
            hiddens: true,
            img_disable: false,
            video_disable: false,
            birthday_disable:false,
            showRetryModal: true,
          })
        }
      })
    }
  },
  //遥控器呼玛
  controlCallQrcode: function (intranet_ip,openid){
    wx.request({
      url: "http://" + intranet_ip + ":8080/showMiniProgramCode?deviceId=" + openid + "&web=true",
      success: function (res) {
        if (res.data.result==0){
          wx.showToast({
            title: '呼玛成功',
            icon: 'none',
            duration: 2000
          });
        }else {
          wx.showToast({
            title: '呼玛失败',
            icon: 'none',
            duration: 2000
          });
        }
       
      },
      fial: function ({ errMsg }) {
        wx.showToast({
          title: '呼玛失败',
          icon: 'none',
          duration: 2000
        });
      },
    })
  },

  //遥控器退出投屏
  controlExitForscreen: function (intranet_ip,openid){
    wx.request({
      url: "http://" + intranet_ip + ":8080/h5/stop?deviceId=" + openid + "&web=true",
      success: function (res) {
        wx.showToast({
          title: '退出成功',
          icon: 'none',
          duration: 2000
        });
      },
      fial: function ({ errMsg }) {
        wx.showToast({
          title: '退出失败',
          icon: 'none',
          duration: 2000
        });
      },
    })

  },
  //遥控器控制音量
  controlChangeVolume: function (intranet_ip, openid, change_type) {

    var timestamp = (new Date()).valueOf();
    var change_type_name = '';
    if (change_type == 3) {
      change_type_name = '减小音量'
    } else if (change_type == 4) {
      change_type_name = '增大音量'
    }
    wx.request({
      url: "http://" + intranet_ip + ":8080/volume?action=" + change_type+"&deviceId=" + openid + "&projectId=" + timestamp+"&web=true",
      success:function(res){
        if (res.data.result==0){
          wx.showToast({
            title: change_type_name + '成功',
            icon: 'none',
            duration: 2000
          })
        }else {
          wx.showToast({
            title: '投屏过程中才可控制音量',
            icon: 'none',
            duration: 2000
          })
        }
        
      },fail:function(){
        wx.showToast({
          title: '投屏过程中才可控制音量',
          icon: 'none',
          duration: 2000
        })
      }
      
      
    })
  },
  //遥控控制节目
  controlChangeProgram: function (intranet_ip, openid, change_type) {
    var timestamp = (new Date()).valueOf();
    wx.request({
      url: "http://" + intranet_ip + ":8080/switchProgram?action=" + change_type + "&deviceId=" + openid + "&projectId=" + timestamp + "&web=true",
      success: function (res) {
        if (res.data.result==0){
          wx.showToast({
            title: '切换成功',
            icon: 'none',
            duration: 2000
          })
        }else {
          wx.showToast({
            title: '电视投屏中，切换无效',
            icon: 'none',
            duration: 2000
          })
        }
        
      }, fail: function () {
        wx.showToast({
          title:  '电视投屏中，切换无效',
          icon: 'none',
          duration: 2000
        })
      }


    })
  },
  onLaunch: function () {
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }



    var that = this
    wx.login({
      success: res => {
        var code = res.code; //返回code
        wx.request({
          url: that.globalData.api_url+'/smallappsimple/index/getJjOpenid',
          data: {
            "code": code
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            
            that.globalData.openid = res.data.result.openid;
            if (that.openidCallback) {
              that.openidCallback(res.data.result.openid);
            }
          }
        })
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.mobile_brand = res.brand;
        that.globalData.mobile_model = res.model;
      }
    })
  },
  onShow: function (options) {
    var app = this;
    wx.getSystemInfo({
      success: function (res) {
        app.globalData.statusBarHeight = res.statusBarHeight;
      }
    })
  },
  globalData: {
    openid: '',
    box_mac: '',
    mobile_brand: '',
    mobile_model: '',
    api_url: 'https://dev-mobile.littlehotspot.com',
  }
})