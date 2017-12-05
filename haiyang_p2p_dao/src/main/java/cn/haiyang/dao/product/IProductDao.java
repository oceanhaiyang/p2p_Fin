package cn.haiyang.dao.product;

import org.springframework.data.jpa.repository.JpaRepository;

import cn.haiyang.domain.product.Product;

public interface IProductDao extends JpaRepository<Product, Long>{
	
}
