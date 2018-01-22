package cn.haiyang.service.productRate;

import cn.haiyang.domain.product.ProductEarningRate;

import java.util.List;

public interface ProductService {
    List<ProductEarningRate> findByProductId(int proId);
}
