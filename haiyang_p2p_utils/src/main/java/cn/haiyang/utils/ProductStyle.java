package cn.haiyang.utils;

/**
 * 类描述：产品属性 状态 常量接口
 */
public interface ProductStyle {
	/** 可复投 **/
	public static final int CAN_REPEAR = 136;
	/** 不可复投 **/
	public static final int CAN_NOT_REPEAR = 137;

	/** 年利率 134 annual rate **/
	public static final int ANNUAL_RATE = 134;
	/** 月利率 135 Monthly rate **/
	public static final int MONTHLY_RATE = 135;

	/** 月存计划 118 **/
	public static final int PLAN_OF_MONTHLY_SAVE = 118;

	/** 月取计划 119 **/
	public static final int PLAN_OF_MONTHLY_TAKE = 119;

	/** 月乘计划 123 multiply **/
	public static final int PLAN_OF_MONTHLY_MULTIPLY = 123;

	/** 老产品--月定投 151 **/
	public static final int PLAN_OF_MONTHLY_SAVE_OLD = 151;

	/** 表示查询条件中的某项下拉选项的全部条件 **/
	public static final String ALL_CONSTANTS = "100000";

	/** 到期一次性回款 109 **/
	public static final String REPAYMENT_WAY_ONECE_DUE_DATE = "109";

	/** 每月部分回款 110 part **/
	public static final String REPAYMENT_WAY_MONTH_PART = "110";

	/** 正常 0 **/
	public static final int NORMAL = 0;
	/** 停用 1 **/
	public static final int STOP_USE = 1;

	/** 可转让 138 **/
	public static final int CAN_TRNASATION = 138;

	/** 不可转让 139 **/
	public static final int CAN_NOT_TRNASATION = 139;

}
