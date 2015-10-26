<?php
/**
 * @category SomethingDigital
 * @package  SomethingDigital_RecentlyViewed
 * @author   Robert Robinson <robr3rd@gmail.com>
 */
class SomethingDigital_RecentlyViewed_Model_Adminhtml_System_Config_sdRecentlyViewedSortOrder
{
	/**
	 * Configure frontend field for `catalog/recently_products/sort_order`
	 * @return array Map for field's label->value
	 */
	 public function toOptionArray()
	 {
		$position = [
			['value'=>'oldnew', 'label'=>'Oldest-Newest'],
			['value'=>'newold', 'label'=>'Newest-Oldest'],
		];

		return $position;
	 }
}
