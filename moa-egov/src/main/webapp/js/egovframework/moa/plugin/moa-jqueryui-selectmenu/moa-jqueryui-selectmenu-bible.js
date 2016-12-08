/*
 * 번역본/성경 목록 드롭다운
 * 작성자 : 최우진(woojin.choi)
 * 작성일 : 2016.09.20
 * 
 */

var MoaBibleDropDown = {

		params : {
			target : null,
			translateVal : null,
			sortVal : null,
			position : "right"
		},
		
		callTranslate : function()
		{
				$obj = this.params.target;
				$obj.moaBootstrapDropdown({
						url: "/moa/bible/bibleByTranslateListComboAjax.do",
						params: "",
						hiddenName: "searchVo.translateSeqNo",
						selectedVal: this.params.translateVal,
						position: this.params.position,
						callback: "MoaBibleDropDown.callSort()"
				});
		},
		
		callSort : function( mode )
		{
				if( mode == null ) {
					$("[id='searchVo.translateSeqNo.layer'] li").each(function(){
						$(this).click(function(){
							MoaBibleDropDown.callSort("repeat");
						});
					});
				}
			
				$obj = this.params.target;
				$obj.moaBootstrapDropdown({
						url: "/moa/bible/bibleBySortListComboAjax.do",
						params: "searchVo.translateSeqNo="+ $("[name='searchVo.translateSeqNo']").val(),
						hiddenName: "searchVo.sortSeqNo",
						selectedVal: this.params.sortVal,
						position: this.params.position
				});
		}
		
};