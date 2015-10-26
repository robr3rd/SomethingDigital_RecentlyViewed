<?php
class SomethingDigital_RecentlyViewed_Model_Adminhtml_System_Config_sdRecentlyViewedPosition
{
   public function toOptionArray()
   {
       $position = array(
           array( 'value' => 'top',    'label' => 'Top'    ),
           array( 'value' => 'bottom', 'label' => 'Bottom' ),
           array( 'value' => 'before',  'label' => 'Above'  ),
           array( 'value' => 'after',  'label' => 'Below'  ),
       );

       return $position;
   }
}
