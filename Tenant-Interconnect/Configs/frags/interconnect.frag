
set routing-instances interconnect instance-type vpls

                          
set interfaces lt-0/0/0 unit 10 description "interconnect-to-root"
set interfaces lt-0/0/0 unit 10 encapsulation ethernet-vpls
set interfaces lt-0/0/0 unit 10 peer-unit 11
set routing-instances interconnect interface lt-0/0/0.10
      
set interfaces lt-0/0/0 unit 11 description "to-interconnect"
set interfaces lt-0/0/0 unit 11 encapsulation ethernet
set interfaces lt-0/0/0 unit 11 peer-unit 10
set interfaces lt-0/0/0 unit 11 family inet address 10.0.1.1/24
set security zones security-zone trust interfaces lt-0/0/0.11
set protocols ospf area 0.0.0.0 interface lt-0/0/0.11
                                                  
set interfaces lt-0/0/0 unit 20 description "interconnect-to-t1"
set interfaces lt-0/0/0 unit 20 encapsulation ethernet-vpls
set interfaces lt-0/0/0 unit 20 peer-unit 21
set routing-instances interconnect interface lt-0/0/0.20
      
set interfaces lt-0/0/0 unit 21 description "t1-untrust-to-interconnect"
set interfaces lt-0/0/0 unit 21 encapsulation ethernet
set interfaces lt-0/0/0 unit 21 peer-unit 20
set interfaces lt-0/0/0 unit 21 family inet address 10.0.1.2/24
set tenants t1 security zones security-zone untrust interfaces lt-0/0/0.21
set tenants t1 routing-instances t1-main interface lt-0/0/0.21
set tenants t1 routing-instances t1-main protocols ospf area 0.0.0.0 interface lt-0/0/0.21
                                                  
set interfaces lt-0/0/0 unit 30 description "interconnect-to-t2"
set interfaces lt-0/0/0 unit 30 encapsulation ethernet-vpls
set interfaces lt-0/0/0 unit 30 peer-unit 31
set routing-instances interconnect interface lt-0/0/0.30
      
set interfaces lt-0/0/0 unit 31 description "t2-untrust-to-interconnect"
set interfaces lt-0/0/0 unit 31 encapsulation ethernet
set interfaces lt-0/0/0 unit 31 peer-unit 30
set interfaces lt-0/0/0 unit 31 family inet address 10.0.1.3/24
set tenants t2 security zones security-zone untrust interfaces lt-0/0/0.31
set tenants t2 routing-instances t2-main interface lt-0/0/0.31
set tenants t2 routing-instances t2-main protocols ospf area 0.0.0.0 interface lt-0/0/0.31
                        

