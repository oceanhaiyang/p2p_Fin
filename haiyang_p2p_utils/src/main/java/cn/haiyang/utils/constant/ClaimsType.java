package cn.haiyang.utils.constant;
/**
 * 类描述：债权类型
 */
public interface ClaimsType {
	
	/**债权类型--新借款**/
	public static final int NEW_BORROW = 129;
	/**债权类型--到期赎回**/
	public static final int DUE_REDEEM = 130;
   /**债权类型--期限内回款**/
	public static final int WITHIN_BACK = 131;
   /**债权状态--未审核**/
	public static final int UNCHECKDE = 11301;
   /**债权状态--已审核**/
    public static final int CHECKED = 11302;
    /**债权状态--正常还款**/
    public static final int NORMAL_REPAY = 11303;
    /**债权状态--已结清**/
	public static final int  SETTLED = 11304;
    /**债权状态--提前结清**/
	public static final int EARLY_SETTLED = 11305;
	/**债权状态--结算失败**/
	public static final int SETTLED_FAIL = 11306;
    /**债权匹配状态--部分匹配**/
    public static final int PART_MATCH = 11401;
    /**债权匹配状态--完全匹配**/
	public static final int  MATCH = 11402;
    /**债权匹配状态--未匹配**/
	public static final int UNMATCH = 11403;
	/**债权匹配状态--正在匹配**/
	public static final int MATCHING = 11404;
    /**债权锁定状态--锁定**/
	public static final int LOCK = 11404;
	/**债权锁定状态--未锁定**/
	public static final int UNLOCK = 11403;
}
