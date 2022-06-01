export const newOrderSendMailStr = `<td align="center" valign="top">
     <div id="m_8166096359726397729m_3590852069051425450m_7217588752662845336template_header_image">
         <p style="margin-top:0px"><img
                 src="https://ci4.googleusercontent.com/proxy/BChSFkwRHLCUaSkPcejGxCJPs5N0-JK8TRWYeZ82OxBsq1_uQ_SHzTKI33JR_OGo9DoU1u8jtPZ2unS-_5_JXk15kqykiUxiB8lKV5CmQgJUO3yvMgCMlum3nRAISQK1afnLMHn74D3N=s0-d-e1-ft#https://www.gravatar.com/userimage/208583486/9631aead15f4d24d7348a9ba17563af3?size=120"
                 alt="Cơm Cháy Rốp"
                 style="border:none;display:inline-block;font-size:14px;font-weight:bold;height:auto;outline:none;text-decoration:none;text-transform:capitalize;vertical-align:middle;max-width:100%;margin-left:0px;margin-right:0px"
                 class="CToWUd"></p>
     </div>
     <table border="0" cellpadding="0" cellspacing="0" width="600"
         id="m_8166096359726397729m_3590852069051425450m_7217588752662845336template_container"
         style="border:1px solid rgb(229,229,229);border-radius:3px;background-color:rgb(255,255,255)">
         <tbody>
             <tr>
                 <td align="center" valign="top">

                     <table border="0" cellpadding="0" cellspacing="0" width="100%"
                         id="m_8166096359726397729m_3590852069051425450m_7217588752662845336template_header"
                         style="border-bottom-width:0px;font-weight:bold;line-height:100%;vertical-align:middle;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;border-radius:3px 3px 0px 0px;background-color:rgb(243,156,18);color:rgb(32,32,32)">
                         <tbody style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif">
                             <tr style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif">
                                 <td id="m_8166096359726397729m_3590852069051425450m_7217588752662845336header_wrapper"
                                     style="padding:36px 48px;display:block;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif">
                                     <h1
                                         style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:30px;font-weight:300;line-height:150%;margin:0px;text-align:left;background-color:inherit;color:rgb(32,32,32)">
                                         Đơn hàng mới: <%= newOrder._id%></h1>
                                 </td>
                             </tr>
                         </tbody>
                     </table>

                 </td>
             </tr>
             <tr>
                 <td align="center" valign="top">

                     <table border="0" cellpadding="0" cellspacing="0" width="600"
                         id="m_8166096359726397729m_3590852069051425450m_7217588752662845336template_body">
                         <tbody>
                             <tr>
                                 <td valign="top"
                                     id="m_8166096359726397729m_3590852069051425450m_7217588752662845336body_content"
                                     style="background-color:rgb(255,255,255)">

                                     <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                         <tbody>
                                             <tr>
                                                 <td valign="top" style="padding:48px 48px 32px">
                                                     <div id="m_8166096359726397729m_3590852069051425450m_7217588752662845336body_content_inner"
                                                         style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:14px;line-height:150%;text-align:left;color:rgb(99,99,99)">

                                                         <p
                                                             style="margin:0px 0px 16px;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif">
                                                             Bạn vừa nhận được đơn hàng từ <%= newOrder.lastName%> <%= newOrder.firstName%>. Đơn hàng như sau:
                                                         </p>

                                                         <h2
                                                             style="display:block;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:18px;font-weight:bold;line-height:130%;margin:0px 0px 18px;text-align:left;color:rgb(243,156,18)">
                                                             <a href="https://comchayrop.com/wp-admin/post.php?post=689&amp;action=edit"
                                                                 style="font-weight:normal;text-decoration:underline;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;color:rgb(32,32,32)"
                                                                 target="_blank"
                                                                 data-saferedirecturl="https://www.google.com/url?q=https://comchayrop.com/wp-admin/post.php?post%3D689%26action%3Dedit&amp;source=gmail&amp;ust=1654015778180000&amp;usg=AOvVaw3exZKl1bJAP23Y5AgfHm51">[Đơn
                                                                 hàng <%= newOrder._id%>]</a> (<%=new Date(newOrder.createdAt).getDate()%> Tháng <%=new Date(newOrder.createdAt).getMonth() + 1%>, <%=new Date(newOrder.createdAt).getFullYear()%>)
                                                         </h2>

                                                         <div
                                                             style="margin-bottom:40px;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif">
                                                             <table cellspacing="0" cellpadding="6" border="1"
                                                                 style="border:1px solid rgb(229,229,229);vertical-align:middle;width:100%;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;color:rgb(99,99,99)">
                                                                 <thead
                                                                     style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif">
                                                                     <tr
                                                                         style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif">
                                                                         <th scope="col"
                                                                             style="border:1px solid rgb(229,229,229);vertical-align:middle;padding:12px;text-align:left;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;color:rgb(99,99,99)">
                                                                             Sản phẩm</th>
                                                                         <th scope="col"
                                                                             style="border:1px solid rgb(229,229,229);vertical-align:middle;padding:12px;text-align:left;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;color:rgb(99,99,99)">
                                                                             Số lượng</th>
                                                                         <th scope="col"
                                                                             style="border:1px solid rgb(229,229,229);vertical-align:middle;padding:12px;text-align:left;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;color:rgb(99,99,99)">
                                                                             Giá</th>
                                                                     </tr>
                                                                 </thead>
                                                                 <tbody
                                                                     style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif">
                                                                  <% newOrder.orderItems.forEach(function(item){ %>
                                                                     <tr
                                                                         style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif">
                                                                         <td
                                                                             style="border:1px solid rgb(229,229,229);padding:12px;text-align:left;vertical-align:middle;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;word-wrap:break-word;color:rgb(99,99,99)">
                                                                             <%= item.product.title%> - <%= item.size%> </td>
                                                                         <td
                                                                             style="border:1px solid rgb(229,229,229);padding:12px;text-align:left;vertical-align:middle;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;color:rgb(99,99,99)">
                                                                             1 </td>
                                                                         <td
                                                                             style="border:1px solid rgb(229,229,229);padding:12px;text-align:left;vertical-align:middle;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;color:rgb(99,99,99)">
                                                                             <span
                                                                                 style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif"><%= item.price * item.quantity%>&nbsp;<span
                                                                                     style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif">₫</span></span>
                                                                         </td>
                                                                     </tr>
                                                                   <% }); %>
                                                                 </tbody>
                                                                 <tfoot
                                                                     style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif">
                                                                     <tr
                                                                         style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif">
                                                                         <th scope="row" colspan="2"
                                                                             style="border:1px solid rgb(229,229,229);vertical-align:middle;padding:12px;text-align:left;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;color:rgb(99,99,99)">
                                                                             Tổng cộng:</th>
                                                                         <td
                                                                             style="border:1px solid rgb(229,229,229);vertical-align:middle;padding:12px;text-align:left;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;color:rgb(99,99,99)">
                                                                             <span
                                                                                 style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif"><%= newOrder.total.toString()%>&nbsp;<span
                                                                                     style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif">₫</span></span>
                                                                         </td>
                                                                     </tr>
                                                                 </tfoot>
                                                             </table>
                                                         </div>


                                                         <table
                                                             id="m_8166096359726397729m_3590852069051425450m_7217588752662845336addresses"
                                                             cellspacing="0" cellpadding="0" border="0"
                                                             style="width:100%;vertical-align:top;margin-bottom:40px;padding:0px;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif">
                                                             <tbody
                                                                 style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif">
                                                                 <tr
                                                                     style="font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif">
                                                                     <td valign="top" width="50%"
                                                                         style="text-align:left;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;border:0px;padding:0px">
                                                                         <h2
                                                                             style="display:block;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;font-size:18px;font-weight:bold;line-height:130%;margin:0px 0px 18px;text-align:left;color:rgb(243,156,18)">
                                                                             Thông tin thanh toán</h2>

                                                                         <address
                                                                             style="padding:12px;border:1px solid rgb(229,229,229);font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;color:rgb(99,99,99)">
                                                                             <%= newOrder.lastName%> <%= newOrder.firstName%><br><%= newOrder.address%><br><a
                                                                                 href="tel:<%= newOrder.phone%>"
                                                                                 style="font-weight:normal;text-decoration:underline;font-family:&quot;Helvetica Neue&quot;,Helvetica,Roboto,Arial,sans-serif;color:rgb(32,32,32)"
                                                                                 target="_blank"><%= newOrder.phone%></a> <br><a
                                                                         </address>
                                                                     </td>
                                                                 </tr>
                                                             </tbody>
                                                         </table>
                                                     </div>
                                                 </td>
                                             </tr>
                                         </tbody>
                                     </table>

                                 </td>
                             </tr>
                         </tbody>
                     </table>

                 </td>
             </tr>
         </tbody>
     </table>
 </td>`;

