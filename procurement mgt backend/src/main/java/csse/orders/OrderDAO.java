package csse.orders;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderDAO extends MongoRepository<PurchaseOrder, String> {

}
