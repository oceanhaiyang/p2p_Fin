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

set define off
spool p2p_Fin.log

prompt
prompt Creating table T_ACCOUNT
prompt ========================
prompt
create table P2P_FIN.T_ACCOUNT
(
  t_id                   NUMBER(10) not null,
  t_add_captial_tatal    FLOAT,
  t_balance              FLOAT,
  t_capital_total        FLOAT,
  t_frozen               FLOAT,
  t_interesta            FLOAT,
  t_interest_total       FLOAT,
  t_inverstmenta         FLOAT,
  t_inverstmentw         FLOAT,
  t_recycling_interest   FLOAT,
  t_total                FLOAT,
  t_uapply_extract_money FLOAT,
  t_userid               NUMBER(10)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table P2P_FIN.T_ACCOUNT
  add primary key (T_ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_ACCOUNT_LOG
prompt ============================
prompt
create table P2P_FIN.T_ACCOUNT_LOG
(
  a_id                   NUMBER(10) not null,
  a_after_trading_money  FLOAT,
  a_amount               FLOAT,
  a_before_trading_money FLOAT,
  a_current_period       NUMBER(10),
  a_date                 TIMESTAMP(6),
  a_descreption          VARCHAR2(255 CHAR),
  a_main_account_id      NUMBER(10),
  a_receive_or_pay       NUMBER(10),
  a_transfer_serial_no   VARCHAR2(255 CHAR),
  a_transfer_status      NUMBER(10),
  a_type                 NUMBER(10),
  a_user_id              NUMBER(10),
  p_id                   NUMBER(10)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255;
alter table P2P_FIN.T_ACCOUNT_LOG
  add primary key (A_ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table T_ADMIN
prompt ======================
prompt
create table P2P_FIN.T_ADMIN
(
  id       NUMBER(10) not null,
  password VARCHAR2(255 CHAR),
  username VARCHAR2(255 CHAR)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table P2P_FIN.T_ADMIN
  add primary key (ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_BANK
prompt =====================
prompt
create table P2P_FIN.T_BANK
(
  t_id        NUMBER(10) not null,
  t_status    NUMBER(10),
  t_desc      VARCHAR2(255 CHAR),
  t_level     NUMBER(10),
  t_name      VARCHAR2(255 CHAR),
  t_number    VARCHAR2(255 CHAR),
  t_city_code VARCHAR2(255 CHAR)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table P2P_FIN.T_BANK
  add primary key (T_ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_BANKCARD
prompt =========================
prompt
create table P2P_FIN.T_BANKCARD
(
  t_id          NUMBER(10) not null,
  t_bank_branch VARCHAR2(255 CHAR),
  t_num         VARCHAR2(255 CHAR),
  t_bank_id     NUMBER(10),
  t_city_id     NUMBER(10),
  t_bank        VARCHAR2(255 CHAR),
  t_phone_num   VARCHAR2(255 CHAR),
  t_user_id     NUMBER(10)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table P2P_FIN.T_BANKCARD
  add primary key (T_ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_CITY
prompt =====================
prompt
create table P2P_FIN.T_CITY
(
  t_id              NUMBER(10) not null,
  t_city_area_num   VARCHAR2(255 CHAR),
  t_city_level      NUMBER(10),
  t_city_name       VARCHAR2(255 CHAR),
  t_parent_city_num VARCHAR2(255 CHAR)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table P2P_FIN.T_CITY
  add primary key (T_ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_FUNDING_NOT_MATCHED
prompt ====================================
prompt
create table P2P_FIN.T_FUNDING_NOT_MATCHED
(
  f_id                NUMBER(10) not null,
  f_create_date       TIMESTAMP(6),
  f_founding_type     NUMBER(10),
  f_founding_weight   NUMBER(10),
  f_invest_record_id  NUMBER(10),
  f_is_locked         NUMBER(10),
  f_not_matched_money FLOAT
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255;
alter table P2P_FIN.T_FUNDING_NOT_MATCHED
  add primary key (F_ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table T_PRODUCT
prompt ========================
prompt
create table P2P_FIN.T_PRODUCT
(
  t_pid                  NUMBER(19) not null,
  t_close_period         NUMBER(10),
  t_early_redeption_type NUMBER(10),
  t_earting_type         NUMBER(10),
  t_invest_rule          FLOAT,
  t_allow_transfer       NUMBER(10),
  t_is_repeat_invest     NUMBER(10),
  t_lower_limit          NUMBER(10),
  t_lower_invest         FLOAT,
  t_pronum               VARCHAR2(255 CHAR),
  t_protype_id           NUMBER(10),
  t_upper_invest         FLOAT,
  t_product_name         VARCHAR2(255 CHAR),
  t_status               NUMBER(10),
  t_upper_limit          NUMBER(10),
  t_return_money         NUMBER(10)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table P2P_FIN.T_PRODUCT
  add primary key (T_PID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_PRODUCTEARNINGRATE
prompt ===================================
prompt
create table P2P_FIN.T_PRODUCTEARNINGRATE
(
  t_id         NUMBER(10) not null,
  t_incomerate FLOAT,
  t_month      NUMBER(10),
  t_pid        NUMBER(10)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table P2P_FIN.T_PRODUCTEARNINGRATE
  add primary key (T_ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table T_PRODUCT_ACCOUNT
prompt ================================
prompt
create table P2P_FIN.T_PRODUCT_ACCOUNT
(
  p_id                    NUMBER(10) not null,
  a_current_period        NUMBER(10),
  p_adv_redemption        FLOAT,
  p_amount                FLOAT,
  p_ava_bal               FLOAT,
  p_begin_date            TIMESTAMP(6),
  p_current_month         NUMBER(10),
  p_cur_real_tot_mon      FLOAT,
  p_date                  TIMESTAMP(6),
  p_days                  TIMESTAMP(6),
  p_deadline              NUMBER(10),
  p_deadline_as_day       NUMBER(10),
  p_deadline_count        NUMBER(10),
  p_deadlines             NUMBER(10),
  p_deduct_interest       FLOAT,
  p_earned_inter          FLOAT,
  p_earnings              FLOAT,
  p_ear_is_finished       NUMBER(10),
  p_earnings_type         NUMBER(10),
  p_end_date              TIMESTAMP(6),
  p_end_inv_tot_mon       FLOAT,
  p_exp_annual_income     FLOAT,
  p_frozen_money          FLOAT,
  p_interest_end_date     TIMESTAMP(6),
  p_interest_start_date   TIMESTAMP(6),
  p_match_date            TIMESTAMP(6),
  p_may_take              FLOAT,
  p_may_take_count        NUMBER(10),
  p_month_interest        FLOAT,
  p_monthly_deposit       FLOAT,
  p_monthly_deposit_count NUMBER(10),
  p_monthly_ext_interest  FLOAT,
  p_not_inv_mon           FLOAT,
  p_product_id            NUMBER(19),
  p_product_name          VARCHAR2(255 CHAR),
  p_pro_type              NUMBER(10),
  p_pro_earnings          FLOAT,
  p_redeem_date           TIMESTAMP(6),
  p_remark                VARCHAR2(255 CHAR),
  p_serial_no             VARCHAR2(255 CHAR),
  p_status                NUMBER(10),
  p_sys_pay_date          NUMBER(10),
  p_take_month            FLOAT,
  p_take_month_count      NUMBER(10),
  p_total                 NUMBER(10),
  p_total_as_day          NUMBER(10),
  p_u_id                  NUMBER(19),
  sum_avabal_frozenmoney  FLOAT,
  u_user_name             VARCHAR2(255 CHAR)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255;
alter table P2P_FIN.T_PRODUCT_ACCOUNT
  add primary key (P_ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table T_USER
prompt =====================
prompt
create table P2P_FIN.T_USER
(
  t_id              NUMBER(10) not null,
  t_email           VARCHAR2(255 CHAR),
  t_email_status    NUMBER(10),
  t_identity        VARCHAR2(255 CHAR),
  t_inviteid        VARCHAR2(255 CHAR),
  t_ip              VARCHAR2(255 CHAR),
  t_login_time      TIMESTAMP(6),
  t_onlock          NUMBER(10),
  t_password        VARCHAR2(255 CHAR),
  t_pay_password    VARCHAR2(255 CHAR),
  t_pay_pwd_status  NUMBER(10),
  t_phone           VARCHAR2(255 CHAR),
  t_phone_status    NUMBER(10),
  t_random_code     VARCHAR2(255 CHAR),
  t_realname        VARCHAR2(255 CHAR),
  t_realname_status NUMBER(10),
  t_regester_time   TIMESTAMP(6),
  t_remark          VARCHAR2(255 CHAR),
  t_sum_friend      VARCHAR2(255 CHAR),
  t_user_secure     NUMBER(10),
  t_usertype        NUMBER(10),
  t_username        VARCHAR2(255 CHAR)
)
tablespace USERS
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table P2P_FIN.T_USER
  add primary key (T_ID)
  using index 
  tablespace USERS
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating sequence HIBERNATE_SEQUENCE
prompt ====================================
prompt
create sequence P2P_FIN.HIBERNATE_SEQUENCE
minvalue 1
maxvalue 9999999999999999999999999999
start with 61
increment by 1
cache 20;


spool off
