## p2p_Fin
仿信和金融的p2p金融项目

使用Oracle数据库，spring data JPA,全注解式开发。

数据库:
  首先创建用户，分配角色权限。

前端使用angular.js和bootstrap
    angularjs的双向绑定：
    双向绑定最常用的场景就是表单，这样当用户在前端页面完成输入后，不用任何操作，我们就可以拿到了用户的数据存放到数据模型中

资源文件配置如下：
注意：oracle的连接驱动是私有的，在maven仓库中不存在，需要手动添加。
#oracle
jdbc.url = jdbc:oracle:thin:@localhost:1521:orcl
jdbc.driver= oracle.jdbc.driver.OracleDriver
jdbc.user = p2p_FIN
jdbc.password = 123

#redis
redis.server=localhost
redis.port=6379

首页展示如下：
![Image text](https://github.com/oceanhaiyang/p2p_Fin/blob/master/haiyang_p2p_home/src/main/webapp/styles/images/home_index.png)

功能模块：
注册成功后，将用户信息保存在redis的token中,并创建相关账户。



--------------------------------------------
-- Export file for user P2P_FIN@ORCL      --
-- Created by lyuha on 2018/3/3, 14:19:00 --
--------------------------------------------

[百度一下](http://taobao.com)

:+1;
