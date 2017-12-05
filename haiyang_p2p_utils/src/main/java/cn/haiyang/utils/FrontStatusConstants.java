package cn.haiyang.utils;
/**
 * 类描述：返回到前台的状态常量接口
 */
public interface FrontStatusConstants {

	/**
	 * 系统异常
	 */
	public static final String SYSTEM_ERROE = "-999";
	/**
	 * 	失败
	 */
	public static final String BREAK_DOWN = "0";
	/**
	 * 	成功
	 */
	public static final String SUCCESS = "1";
	/**
	 * 	没有可用结果
	 */
	public static final String NULL_RESULT = "2";
	/**	参数不符要求
	 * 
	 */
	public static final String PARAM_VALIDATE_FAILED = "3";
	/**
	 * 	没通过实名认证
	 */
	public static final String REALNAME_VALIDATE_FAILED = "4";
	/**
	 * 	已经添加过银行卡信息
	 */
	public static final String CARDINFO_ALREADY_EXIST = "5";
	/**
	 * 	银行卡号已经被占用
	 */
	public static final String CARD_ALREADY_EXIST = "6";
	/**
	 * 	没有此用户
	 */
	public static final String USER_NOT_EXIST = "7";
	/**
	 * 	令牌伪造
	 */
	public static final String TOKEN_FORGE  = "8";	
	/**
	 * 	待匹配的资金id不正确  prepare
	 */
	public static final String ID_ERROE_OF_PREPARE_MATCH_MONEY = "9";
	/**
	 * 	权重值输入不正确
	 */
	public static final String INPUT_OF_WEIGHT_VALUE_ERROE = "10";
	/**
	 * 	修改失败
	 */
	public static final String MODIFY_ERROR = "11";
	/**
	 * 	缓存存储异常
	 */
	public static final String CACHE_EXCEPTION  = "12";
	/**
	 * 	token为空
	 */
	public static final String NULL_TOKEN  = "13";
	/**
	 * 	用户名为空
	 */
	public static final String NULL_USERNAME = "14";
	/**
	 * 	用户未登录 Not logged in
	 */
	public static final String NOT_LOGGED_IN = "15";
	/**
	 * 	魔投方式不能为空 magic
	 */
	public static final String NULL_OF_MAGIC_INVERST = "16";
	/**
	 * 	投资金额不能大于账户余额 not sufficient funds
	 */
	public static final String NOT_SUFFICIENT_FUNDS = "17";
	/**
	 * 	没有选择产品
	 */
	public static final String HAS_NOT_CHOOSED_PRODUCT = "18";
	/**
	 * 	投资金额不能为空 Investment amount
	 */
	public static final String NULL_OF_INVESTMENT_AMOUNT = "19";
	/**
	 * 	每月提取利息不能小于0  less than zero
	 */
	public static final String LESS_THAN_ZERO = "20";
	/**
	 * 	每月提取利息不能大于每月赢取利息 Extract Stringerest
	 */
	public static final String MORE_THAN_CAN_EXTRACT_INVEREST = "21";
	/**
	 * 	借款申请金额格式错误 Format
	 */
	public static final String FORMAT_ERROE_OF_MONEY = "22";
	/**
	 * 	姓名只能为中文
	 */
	public static final String MUST_BE_CHAINESE = "23";
	/**
	 * 	未选中性别 gender
	 */
	public static final String NULL_OF_GENDER = "24";
	/**
	 * 	手机格式错误 Mobile No
	 */
	public static final String FORMAT_ERROE_OF_MOBILE = "25";
	/**
	 * 	验证码不能为空
	 */
	public static final String NULL_OF_VALIDATE_CARD = "26";
	/**
	 * 	验证码输入不正确
	 */
	public static final String INPUT_ERROR_OF_VALIDATE_CARD = "27";
	/**
	 * 	字典表组名不能为空！ Dictionary
	 */
	public static final String NULL_OF_GROUP_FOR_DICTIONARY_TABLE = "28";
	/**
	 * 	字典表选项名不能为空！ Option of
	 */
	public static final String NULL_OF_OPTION_NAME_FOR_DICTIONARY_TABLE = "29";
	/**
	 * 	字典表选项值不能为空！
	 */
	public static final String NULL_OF_OPTION_VALUE_FOR_DICTIONARY_TABLE = "30";
	/**
	 * 	组名存在 exist
	 */
	public static final String NOT_EXIST_OF_GROUP_NAME = "31";
	/**
	 * 	选项名存在
	 */
	public static final String ALREADY_EXIST_OF_OPTION_NAME = "32";
	/**
	 * 	未选择要删除的id
	 */
	public static final String NONE_SELECTED_OF_NEED_DELETE = "33";
	/**
	 * 	id必须是数字
	 */
	public static final String MUST_BE_NUMBER = "34";
	/**
	 * 	未选择要更新的id
	 */
	public static final String NONE_SELECTED_OF_UPDATE_ID = "35";
	/**
	 * 	分页号不能为空
	 */
	public static final String NULL_OF_PAGING_NO = "36";
	/**
	 * 	分页参数不能为空
	 */
	public static final String NULL_OF_PAGING_PARAM = "37";
	/**
	 * 	借款Id（合同编号）不能为空 Contract No
	 */
	public static final String NULL_OF_CONTRACT_NO = "38";
	/**
	 * 	债务人不能为空 Debtor
	 */
	public static final String NULL_OF_DEBTOR  = "39";
	/**
	 * 	身份证号不能为空
	 */
	public static final String NULL_OF_ID_CARD = "40";
	/**
	 * 	借款用途不能为空 Purpose
	 */
	public static final String NULL_OF_PURPOSE = "41";
	/**
	 * 	借款类型（标的类型）不能为空 Borrowing type
	 */
	public static final String NULL_OF_BORROWING_TYPE = "42";
	/**
	 * 	原始期限（月）不能为空 original  deadline
	 */
	public static final String NULL_OF_ORIGINAL_DEADLINE = "43";
	/**
	 * 	原始借款开始日期不能为空
	 */
	public static final String NULL_OF_ORIGINAL_BORROWING_BEGIN_DATE = "44";
	/**
	 * 	原始借款到期日期不能为空  Maturity
	 */
	public static final String NULL_OF_ORIGINAL_BORROWING_MATURITY_DATE = "45";
	/**
	 * 	还款方式不能为空
	 */
	public static final String NULL_OF_REPAYMENT_TYPE = "46";
	/**
	 * 	还款日不能为空
	 */
	public static final String NULL_OF_REPAYMENT_DATE = "47";
	/**
	 * 	还款金额（元）不能为空
	 */
	public static final String NULL_OF_REPAYMENT_AMOUNT = "48";
	/**
	 * 	债权金额（元）不能为空 Claim
	 */
	public static final String NULL_OF_CLAIM_AMOUNT = "49";
	/**
	 * 	债权年化利率（%）不能为空 debtYearRate
	 */
	public static final String NULL_OF_CLAIM_YEAR_RATE = "50";
	/**
	 * 	债权转入金额不能为空
	 */
	public static final String NULL_OF_CLAIM_ROLL_IN_AMOUNT = "51";
	/**
	 * 	债权转入日期不能为空
	 */
	public static final String NULL_OF_CALIM_ROLL_IN_DATE = "52";
	/**
	 * 	债权转入期限（月）不能为空
	 */
	public static final String NULL_OF_CALIM_ROLL_IN_DEADLINE = "53";
	/**	债权转出日期不能为空
	 * 
	 */
	public static final String NULL_OF_CALIM_ROLL_OUT_DATE = "54";
	/**
	 * 	债权人不能为空
	 */
	public static final String NULL_OF_DEBTEE = "55";
	/**
	 * 	身份证号长度为数字字母
	 */
	public static final String ID_CARD_LENGTH_15_OR_18 = "56";
	/**
	 * 	债权状态不能修改
	 */
	public static final String CALIM_STATUS_MUST_NOT_MODIFY = "57";
	/**
	 * 	债权状态不能为空
	 */
	public static final String NULL_OF_CALIM_STATUS = "58";
	/**
	 * 	债权编号不能为空
	 */
	public static final String NULL_OF_CALIM_NO = "59";
	/**
	 * 	债权状态不能删除
	 */
	public static final String CALIM_STATUS_MUST_NOT_DELETE = "60";
	/**
	 * 	未选中需要下载的数据
	 */
	public static final String NOT_HAS_CHOOSED_DOWNLOAD_DATA = "61";
	/**
	 * 	审核状态不能为空 check
	 */
	public static final String NULL_OF_CHECK_STATUS = "62";
	/**
	 * 	债权转让表Id为空或格式不正确
	 */
	public static final String NULL_OF_CALIM_ID_OR_FORMAT_ERROR = "63";
	/**
	 * 	债权转让表权重值输入不正确！
	 */
	public static final String INPUT_ERROR_OF_CALIM_TABLE_WEIGHT_VALUE = "64";
	/**
	 * 	用户锁定
	 */
	public static final String LOCKED_USER = "65";
	/**
	 * 	用户名密码不正确
	 */
	public static final String ERROR_OF_USERNAME_PASSWORD = "66";
	/**
	 * 	手机已经被注册 register
	 */
	public static final String MOBILE_ALREADY_REGISTER = "67";
	/**
	 * 	用户名格式不正确
	 */
	public static final String FORMAT_ERROR_OF_USERNAME = "68";
	/**
	 * 	用户名不能为纯数字
	 */
	public static final String MUST_NOT_ONLY_NUMBER_OF_USERNAME = "69";
	/**
	 * 	用户名已经存在
	 */
	public static final String ALREADY_EXIST_OF_USERNAME = "70";
	/**
	 * 	密码为空
	 */
	public static final String NULL_OF_PASSWORD = "71";
	/**
	 * 	密码为8-16位数字或字母组合
	 */
	public static final String PASSWORD_MUST_BETWEEN_8_AND_16_GROUP_WITH_NUM_AND_LETTER = "72";
	/**
	 * 	邀请码格式不正确 Invite code
	 */
	public static final String FORMAT_ERROR_OF_INVITE_CODE = "73";
	/**
	 * 	员工不存在
	 */
	public static final String EMPLOYEE_NOT_EXIST = "74";
	/**
	 * 	注册失败
	 */
	public static final String REGISTER_LOSED = "75";
	/**
	 * 	老密码不能为空
	 */
	public static final String NULL_OF_OLD_PASSWORD = "76";
	/**
	 * 	新密码不能为空
	 */
	public static final String NULL_OF_NEW_PASSWORD = "77";
	/**
	 * 	token过期  expire 
	 */
	public static final String USELESS_TOKEN = "78";
	/**
	 * 	新密码不能与旧密码相同
	 */
	public static final String NEW_PASSWOED_SAME_WITH_OLD_PASSWORD = "79";
	/**
	 * 	手机不能为空
	 */
	public static final String NULL_OF_MOBILE_NO = "80";
	/**
	 * 	添加失败
	 */
	public static final String ADD_LOSED = "81";
	/**
	 * 	姓名证件不匹配  UnMatch  papers
	 */
	public static final String NAME_UNMATCH_PAPER = "82";
	/**
	 * 	匹配结果未确认 unconfirmed
	 */
	public static final String UNCONFIRMED_MACTH_RESULT = "83";
	/**
	 * 	匹配结果已确认
	 */
	public static final String CONFIRMED_MACTH_RESULT = "84";
	/**
	 * 	匹配结果未清算 Clearing
	 */
	public static final String UNCLEARING_MACTH_RESULT = "85";
	/**
	 * 	匹配结果已清算
	 */
	public static final String CLEARING_MACTH_RESULT = "86";
	
	/**
	 * 	投资类型必须是数字
	 */
	public static final String NUM_OF_INVESTMENT_TYPE = "89";
	
	/**
	 * 	投资类型不能为空
	 */
	public static final String NULL_OF_INVESTMENT_TYPE = "90";
	
	/**
	 * 	输入的产品名必须是数字
	 */
	public static final String NUM_OF_PRODUCT_NAME = "91";
	/**
	 * 	清算日期不能为空
	 */
	public static final String SETTLE_DATE_IS_NOT_NULL = "95";
	/**
	 * 	输入的页面不能小于1
	 */
	public static final String PAGE_NOT_LESS_ONE = "103";
	/**
	 * 	起始时间不能大于截止时间
	 */
	public static final String BEGINTIME_NOTBIG_ENDTIME = "105";
	
	public static final String USERNAME_PASSWORD_IS_NOT_NULL = "110";
	
	/**
	 * 	有人在使用
	 */
	public static final String SOMEONE_USE_NOW = "148";
	
	/**
	 * 	操作时间过时
	 */
	public static final String TIME_OUT = "152";
	/**
	 * 	未选中退出队列
	 */
	public static final String NULL_SELECT_OUTACCOUNT = "157";
	/**
	 * 	资金已结算成功
	 */
	public static final String SETTLE_MENT_SUCCESS = "159";
	/**
	 * 	资金结算进行中
	 */
	public static final String SETTLE_MENT_INIT = "160";
	/**
	 * 	债权已结算成功或债权结算进行中
	 */
	public static final String DEBT_SETTLE_MENT_EXEC = "161";
	
	/**
	 * 	债权状态必须为已审核或正常还款
	 */
	public static final String DEBT_CHECK_ADVANCESETTLE_STATUS = "162";
	/**
	 * 	资金结算失败
	 */
	public static final String SETTLE_MENT_FAIL = "168";
	/**
	 * 	债权自动结算未成功，不能进行提前结清操作;
	 */
	public static final String SETTLE_AUTODEBT_ANDVANCE_STATUS= "171";
	/**
	 * 	宕机处理时间不能在当前时间之后
	 */
	public static final String SETTLE_TIME_AFTER_NOW= "172";
	/**
	 * 	没有选择手续费的承担者
	 */
	public static final String NUll_COST_TAKER= "178";
	

	/**
	 * 注册用户名
	 */
	public static  final String REGISTERED_USER_NAME = "注册用户名";
	/**
	 * 真实姓名
	 */
	public static final String REAL_NAME = "真实姓名";
	/**
	 * 邮件地址
	 */
	public static final String EMAIL_ADDRESS = "邮件地址";
	/**
	 * 注册时间
	 */
	public static final String REGISTRATION_TIME = "注册时间";
	/**
	 * 投资时间
	 */
	public static final String INVESTMENT_TIME = "投资时间";
	/**
	 *投资金额 
	 */
	public static final String INVESTMENT_AMOUNT = "投资金额";
	/**
	 * 注册来源
	 */
	public static final String REGISTERED_SOURCE = "注册来源";
	/**
	 * 注册类型
	 */
	public static final String REGISTERED_TYPE = "注册类型";
	/**
	 * 投资产品
	 */
	public static final String INVESTMENT_PRODUCTS = "投资产品";
	/**
	 * 投资人
	 */
	public static final String INVESTOR ="投资人";//投资人
	/**
	 * 借款人
	 */		
	public static final String BORROWER = "借款人";//借款人

	/**
	 * 提现手续费不能为空
	 */
	public static final String NOT_NULL_COST ="179";
	/**
	 * 充值手续费不能为空
	 */
	public static final String NOT_NULL_CHARGER ="180";
	/**
	 * 没有选择充值手续费承担者
	 */
	public static final String NUll_CHARGECOST_TAKER ="181";
	/**
	 * 注册时，您已超过今日短信次数，请明天再试
	 */
	public static final String OVER_MESSAGE_TIMES ="182";
	/**
	 * yyyy-MM-dd
	 */
    public static final String DATE_FORMAT = "yyyy-MM-dd";
    /**
     * yyyy-MM-dd HH:mm:ss
     */
    public static final String DATE_FOR_MAT = "yyyy-MM-dd HH:mm:ss";
    
    
}
