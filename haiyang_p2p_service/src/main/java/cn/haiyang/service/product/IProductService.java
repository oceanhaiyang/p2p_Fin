package cn.haiyang.service.product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import cn.haiyang.domain.product.Product;
import cn.haiyang.domain.product.ProductEarningRate;

public interface IProductService {

	List<Product> findAll();

	Product findOne(long proId);

	List<ProductEarningRate> findRatesById(long parseLong);

	void update(Product product);

}
