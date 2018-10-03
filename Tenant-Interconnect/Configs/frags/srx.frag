set system security-profile bronze policy maximum 500
set system security-profile bronze policy reserved 100
set system security-profile bronze zone maximum 50
set system security-profile bronze zone reserved 10
set system security-profile bronze flow-session maximum 1000
set system security-profile bronze flow-session reserved 500
set system security-profile bronze nat-source-pool maximum 50
set system security-profile bronze nat-source-pool reserved 10
set system security-profile bronze nat-pat-address maximum 50
set system security-profile bronze nat-pat-address reserved 10
set system security-profile bronze nat-source-rule maximum 50
set system security-profile bronze nat-source-rule reserved 10
set system security-profile bronze nat-rule-referenced-prefix maximum 20
set system security-profile bronze nat-rule-referenced-prefix reserved 10

      
set interfaces ge-0/0/0 vlan-tagging
set interfaces ge-0/0/0 unit 70 description root-untrust
set interfaces ge-0/0/0 unit 70 vlan-id 70 
set interfaces ge-0/0/0 unit 70 family inet address 192.168.70.2/24 
set security zones security-zone untrust interfaces ge-0/0/0.70
set security zones security-zone trust host-inbound-traffic protocols ospf
set protocols ospf export generate-default
set policy-options policy-statement generate-default term 1 from route-filter 0.0.0.0/0 exact accept

  
set security screen ids-option baseline-screens icmp fragment
set security screen ids-option baseline-screens icmp large
set security screen ids-option baseline-screens icmp flood
set security screen ids-option baseline-screens icmp ping-death
set security screen ids-option baseline-screens ip spoofing
set security screen ids-option baseline-screens ip unknown-protocol
set security screen ids-option baseline-screens tcp syn-fin
set security screen ids-option baseline-screens tcp tcp-no-flag
set security screen ids-option baseline-screens tcp syn-frag
set security screen ids-option baseline-screens tcp land
set security screen ids-option baseline-screens tcp winnuke
set security screen ids-option baseline-screens udp flood

set security zones security-zone untrust screen baseline-screens
set security zones security-zone untrust host-inbound-traffic system-services ssh
set security zones security-zone untrust host-inbound-traffic system-services ping
set security zones security-zone untrust host-inbound-traffic protocols ospf

set security zones security-zone trust screen baseline-screens
set security zones security-zone trust host-inbound-traffic system-services ssh
set security zones security-zone trust host-inbound-traffic system-services ping

set security policies from-zone trust to-zone untrust policy 1 match source-address any
set security policies from-zone trust to-zone untrust policy 1 match destination-address any
set security policies from-zone trust to-zone untrust policy 1 match application any
set security policies from-zone trust to-zone untrust policy 1 then permit

set security policies from-zone untrust to-zone trust policy 2 match source-address any
set security policies from-zone untrust to-zone trust policy 2 match destination-address any
set security policies from-zone untrust to-zone trust policy 2 match application any
set security policies from-zone untrust to-zone trust policy 2 then permit

set security policies default-policy deny-all
set security policies policy-rematch

set security policies global policy deny-log match source-address any
set security policies global policy deny-log match destination-address any
set security policies global policy deny-log match application any
set security policies global policy deny-log then deny
set security policies global policy deny-log then log session-init
set security policies global policy deny-log then log session-close

      
set system login class t1-admin tenant t1
set system login class t1-admin permissions all
set system login class t1-admin deny-commands "(telnet)|(traceroute)|(ssh)|(show log)"
set system login user t1-admin class t1-admin
set system login user t1-admin authentication encrypted-password "$6$jRdj1B8I$tkux7Cn0gTSJchiZoc2q.ZVWNC97YHfU7sFJDiEiqFVD6SQX8QnqMFrgEtU.0E62.U8F7UZS2n/o5oFbg5qhF/"

set system login class tenant1-admin tenant t1

set interfaces ge-0/0/1 vlan-tagging
set interfaces ge-0/0/1 unit 210 description t1-trust
set interfaces ge-0/0/1 unit 210 vlan-id 210
set interfaces ge-0/0/1 unit 210 family inet address 172.16.210.2/24
set tenants t1 security zones security-zone trust interfaces ge-0/0/1.210
set tenants t1 routing-instances t1-main instance-type virtual-router
set tenants t1 routing-instances t1-main interface ge-0/0/1.210
set tenants t1 routing-instances t1-main protocols ospf area 0.0.0.0 interface ge-0/0/1.210 passive

  
set tenants t1 security screen ids-option baseline-screens icmp fragment
set tenants t1 security screen ids-option baseline-screens icmp large
set tenants t1 security screen ids-option baseline-screens icmp flood
set tenants t1 security screen ids-option baseline-screens icmp ping-death
set tenants t1 security screen ids-option baseline-screens ip spoofing
set tenants t1 security screen ids-option baseline-screens ip unknown-protocol
set tenants t1 security screen ids-option baseline-screens tcp syn-fin
set tenants t1 security screen ids-option baseline-screens tcp tcp-no-flag
set tenants t1 security screen ids-option baseline-screens tcp syn-frag
set tenants t1 security screen ids-option baseline-screens tcp land
set tenants t1 security screen ids-option baseline-screens tcp winnuke
set tenants t1 security screen ids-option baseline-screens udp flood

set tenants t1 security zones security-zone untrust screen baseline-screens
set tenants t1 security zones security-zone untrust host-inbound-traffic system-services ssh
set tenants t1 security zones security-zone untrust host-inbound-traffic system-services ping
set tenants t1 security zones security-zone untrust host-inbound-traffic protocols ospf

set tenants t1 security zones security-zone trust screen baseline-screens
set tenants t1 security zones security-zone trust host-inbound-traffic system-services ssh
set tenants t1 security zones security-zone trust host-inbound-traffic system-services ping

set tenants t1 security policies from-zone trust to-zone untrust policy 1 match source-address any
set tenants t1 security policies from-zone trust to-zone untrust policy 1 match destination-address any
set tenants t1 security policies from-zone trust to-zone untrust policy 1 match application any
set tenants t1 security policies from-zone trust to-zone untrust policy 1 then permit

set tenants t1 security policies from-zone untrust to-zone trust policy 2 match source-address any
set tenants t1 security policies from-zone untrust to-zone trust policy 2 match destination-address any
set tenants t1 security policies from-zone untrust to-zone trust policy 2 match application any
set tenants t1 security policies from-zone untrust to-zone trust policy 2 then permit

set tenants t1 security policies default-policy deny-all
set tenants t1 security policies policy-rematch

set tenants t1 security policies global policy deny-log match source-address any
set tenants t1 security policies global policy deny-log match destination-address any
set tenants t1 security policies global policy deny-log match application any
set tenants t1 security policies global policy deny-log then deny
set tenants t1 security policies global policy deny-log then log session-init
set tenants t1 security policies global policy deny-log then log session-close

      
set system login class t2-admin tenant t2
set system login class t2-admin permissions all
set system login class t2-admin deny-commands "(telnet)|(traceroute)|(ssh)|(show log)"
set system login user t2-admin class t2-admin
set system login user t2-admin authentication encrypted-password "$6$jRdj1B8I$tkux7Cn0gTSJchiZoc2q.ZVWNC97YHfU7sFJDiEiqFVD6SQX8QnqMFrgEtU.0E62.U8F7UZS2n/o5oFbg5qhF/"

set system login class tenant1-admin tenant t2

set interfaces ge-0/0/1 vlan-tagging
set interfaces ge-0/0/1 unit 220 description t2-trust
set interfaces ge-0/0/1 unit 220 vlan-id 220
set interfaces ge-0/0/1 unit 220 family inet address 172.16.220.2/24
set tenants t2 security zones security-zone trust interfaces ge-0/0/1.220
set tenants t2 routing-instances t2-main instance-type virtual-router
set tenants t2 routing-instances t2-main interface ge-0/0/1.220
set tenants t2 routing-instances t2-main protocols ospf area 0.0.0.0 interface ge-0/0/1.220 passive

  
set tenants t2 security screen ids-option baseline-screens icmp fragment
set tenants t2 security screen ids-option baseline-screens icmp large
set tenants t2 security screen ids-option baseline-screens icmp flood
set tenants t2 security screen ids-option baseline-screens icmp ping-death
set tenants t2 security screen ids-option baseline-screens ip spoofing
set tenants t2 security screen ids-option baseline-screens ip unknown-protocol
set tenants t2 security screen ids-option baseline-screens tcp syn-fin
set tenants t2 security screen ids-option baseline-screens tcp tcp-no-flag
set tenants t2 security screen ids-option baseline-screens tcp syn-frag
set tenants t2 security screen ids-option baseline-screens tcp land
set tenants t2 security screen ids-option baseline-screens tcp winnuke
set tenants t2 security screen ids-option baseline-screens udp flood

set tenants t2 security zones security-zone untrust screen baseline-screens
set tenants t2 security zones security-zone untrust host-inbound-traffic system-services ssh
set tenants t2 security zones security-zone untrust host-inbound-traffic system-services ping
set tenants t2 security zones security-zone untrust host-inbound-traffic protocols ospf

set tenants t2 security zones security-zone trust screen baseline-screens
set tenants t2 security zones security-zone trust host-inbound-traffic system-services ssh
set tenants t2 security zones security-zone trust host-inbound-traffic system-services ping

set tenants t2 security policies from-zone trust to-zone untrust policy 1 match source-address any
set tenants t2 security policies from-zone trust to-zone untrust policy 1 match destination-address any
set tenants t2 security policies from-zone trust to-zone untrust policy 1 match application any
set tenants t2 security policies from-zone trust to-zone untrust policy 1 then permit

set tenants t2 security policies from-zone untrust to-zone trust policy 2 match source-address any
set tenants t2 security policies from-zone untrust to-zone trust policy 2 match destination-address any
set tenants t2 security policies from-zone untrust to-zone trust policy 2 match application any
set tenants t2 security policies from-zone untrust to-zone trust policy 2 then permit

set tenants t2 security policies default-policy deny-all
set tenants t2 security policies policy-rematch

set tenants t2 security policies global policy deny-log match source-address any
set tenants t2 security policies global policy deny-log match destination-address any
set tenants t2 security policies global policy deny-log match application any
set tenants t2 security policies global policy deny-log then deny
set tenants t2 security policies global policy deny-log then log session-init
set tenants t2 security policies global policy deny-log then log session-close

