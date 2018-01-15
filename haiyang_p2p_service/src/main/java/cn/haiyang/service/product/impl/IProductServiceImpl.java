package cn.haiyang.service.product.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.haiyang.dao.product.IProductDao;
import cn.haiyang.dao.product.IProductEarnRateDao;
import cn.haiyang.domain.product.Product;
import cn.haiyang.domain.product.ProductEarningRate;
import cn.haiyang.service.product.IProductService;
import cn.haiyang.utils.ProductStyle;
@Service
@Transactional
public class IProductServiceImpl implements IProductService{

	@Autowired
	private IProductDao iProductDao;
	
	@Autowired
	private IProductEarnRateDao ProductEarnRateDao;

	/**
	 * 查询所有产品信息
	 * 
	 */
	public List<Product> findAll() {
		// TODO Auto-generated method stub
		List<Product> pd = iProductDao.findAll();
		changeStatusToChinese(pd);
		return pd;
		
	}	
	
	/**
	 * 查看产品信息
	 * 
	 */
	public Product findOne(long proId) {
		// TODO Auto-generated method stub
		Product p =iProductDao.findOne(proId);
		changeStatusToChinese(p);
		return p;
	}
	
	/**
	 * 产品利率的回显
	 * 
	 */
	public List<ProductEarningRate> findRatesById(long proId) {
		// TODO Auto-generated method stub
		return ProductEarnRateDao.findByProductId((int) proId);
	}
	/**
	 * 产品信息的修改及关联表的操作
	 * 
	 */
	
	public void update(Product product) {
		// TODO Auto-generated method stub
		 List<ProductEarningRate> per = ProductEarnRateDao.findByProductId((int)product.getProId());
		 if(per!=null&& per.size()>0){
			 ProductEarnRateDao.delByProductId((int)product.getProId());
		 }
		//先删除之前的利率，再保存。
		 ProductEarnRateDao.save(product.getProEarningRate());
		 
		 iProductDao.save(product);
		 
	}
	
	/**
	 * 将数据库的int字段转为string(单条数据)
	 * 
	 */
	private void changeStatusToChinese(Product products){
		List<Product> ps = new ArrayList<Product>();
		ps.add(products);
		changeStatusToChinese(ps);
 		
	}
	/**
	 * 将数据库的int字段转为string（list）
	 * 
	 */
	private void changeStatusToChinese(List<Product> products) {
		if (null == products)
			return;
		for (Product product : products) {
			int way = product.getWayToReturnMoney();
			// 每月部分回款
			if (ProductStyle.REPAYMENT_WAY_MONTH_PART.equals(String.valueOf(way))) {
				product.setWayToReturnMoneyDesc("每月部分回款");
				// 到期一次性回款
			} else if (ProductStyle.REPAYMENT_WAY_ONECE_DUE_DATE.equals(String.valueOf(way))) {
				product.setWayToReturnMoneyDesc("到期一次性回款");
			}

			// 是否复投 isReaptInvest 136：是、137：否
			// 可以复投
			if (ProductStyle.CAN_REPEAR == product.getIsRepeatInvest()) {
				product.setIsRepeatInvestDesc("是");
				// 不可复投
			} else if (ProductStyle.CAN_NOT_REPEAR == product.getIsRepeatInvest()) {
				product.setIsRepeatInvestDesc("否");
			}
			// 年利率
			if (ProductStyle.ANNUAL_RATE == product.getEarningType()) {
				product.setEarningTypeDesc("年利率");
				// 月利率 135
			} else if (ProductStyle.MONTHLY_RATE == product.getEarningType()) {
				product.setEarningTypeDesc("月利率");
			}

			if (ProductStyle.NORMAL == product.getStatus()) {
				product.setStatusDesc("正常");
			} else if (ProductStyle.STOP_USE == product.getStatus()) {
				product.setStatusDesc("停用");
			}

			// 是否可转让
			if (ProductStyle.CAN_NOT_TRNASATION == product.getIsAllowTransfer()) {
				product.setIsAllowTransferDesc("否");
			} else if (ProductStyle.CAN_TRNASATION == product.getIsAllowTransfer()) {
				product.setIsAllowTransferDesc("是");
			}
		}
	
}

	

	

	
	
	

}
