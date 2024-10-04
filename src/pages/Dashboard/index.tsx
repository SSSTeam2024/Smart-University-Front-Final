import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CustomerSatisfaction from './CustomerSatisfaction';
import NewCustomers from './NewCustomers';
import ProductDelivery from './ProductDelivery';
import StockReport from './StockReport';
import TopCategories from './TopCategories';
import TopProducts from './TopProducts';
import TopSalesLocation from './TopSalesLocation';
import Widgets from './Widgets';
import RecentOrders from './RecentOrders';
import Revenue from './Revenue';
import { selectCurrentUser } from "features/account/authSlice";
import { RootState } from "app/store";
import { useSelector } from "react-redux";

const Dashboard = () => {

    document.title = "Dashboard | Smart University";
    const user: any = useSelector((state: RootState) => selectCurrentUser(state));
    

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xxl={12} lg={6} className="order-first">
                            <Row className="row-cols-xxl-4 row-cols-1">
                                <Widgets />
                            </Row>
                        </Col>
                        <Revenue />
                        <TopSalesLocation />
                    </Row>
                    <Row>
                        <RecentOrders />
                    </Row>
                    <Row className='widget-responsive-fullscreen'>
                        <CustomerSatisfaction />
                        <StockReport />
                        <ProductDelivery />
                        <TopCategories />
                        <NewCustomers />
                        <TopProducts />
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;