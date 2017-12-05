package cn.haiyang.dao.product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import cn.haiyang.domain.product.ProductEarningRate;

public interface IProductEarnRateDao extends JpaRepository<ProductEarningRate, Integer>{
	List<ProductEarningRate> findByProductId(int proId);
	@Modifying
	@Query("delete from ProductEarningRate per where per.productId=?1")
	void delByProductId(int proId);
}
